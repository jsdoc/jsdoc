/*
  Copyright 2019 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import dependencyGraph from 'dependency-graph';
import Emittery from 'emittery';
import _ from 'lodash';
import ow from 'ow';
import Queue from 'p-queue';

import v from './validators.js';

const { DepGraph } = dependencyGraph;

export class TaskRunner extends Emittery {
  #context;
  #deps;
  #error;
  #nameToTask;
  #queue;
  #running;
  #taskToName;
  #unsubscribers;

  constructor(context) {
    super();

    ow(context, ow.optional.object);

    this.#init(context);
  }

  #addOrRemoveTasks(tasks, func, action) {
    func = _.bind(func, this);

    if (_.isArray(tasks)) {
      tasks.forEach((task, i) => {
        try {
          func(task);
        } catch (e) {
          e.message = `Can't ${action} task ${i}: ${e.message}`;
          throw e;
        }
      });
    } else if (_.isObject(tasks)) {
      for (const task of Object.keys(tasks)) {
        try {
          func(tasks[task]);
        } catch (e) {
          e.message = `Can't ${action} task "${task}": ${e.message}`;
          throw e;
        }
      }
    }
  }

  #addTaskEmitters(task) {
    const u = {};

    u.start = task.on('start', (t) => this.emit('taskStart', t));
    u.end = task.on('end', (t) => this.emit('taskEnd', t));
    u.error = task.on('error', (e) => {
      this.emit('taskError', {
        task: e.task,
        error: e.error,
      });

      if (!this.#error) {
        this.#error = e.error;
      }
    });

    this.#unsubscribers.set(task.name, u);
  }

  #bindTaskFunc(task) {
    return _.bind(task.run, task, this.#context);
  }

  #createTaskSequence(tasks) {
    if (!tasks.length) {
      return null;
    }

    return () =>
      tasks.reduce((p, taskName) => {
        const task = this.#nameToTask.get(taskName);

        return p.then(this.#bindTaskFunc(task), (e) => Promise.reject(e));
      }, Promise.resolve());
  }

  #init(context) {
    this.#context = context;
    this.#deps = new Map();
    this.#error = null;
    this.#nameToTask = new Map();
    this.#queue = new Queue();
    this.#running = false;
    this.#taskToName = new WeakMap();
    this.#unsubscribers = new Map();

    this.#queue.pause();
  }

  #newDependencyCycleError(cyclePath) {
    return new v.DependencyCycleError(
      `Tasks have circular dependencies: ${cyclePath.join(' > ')}`,
      cyclePath
    );
  }

  #newStateError() {
    return new v.StateError('The task runner is already running.');
  }

  #newUnknownDepsError(dependent, unknownDeps) {
    let errorText;

    if (unknownDeps.length === 1) {
      errorText = 'an unknown task';
    } else {
      errorText = 'unknown tasks';
    }

    return new v.UnknownDependencyError(
      `The task ${dependent} depends on ${errorText}: ${unknownDeps.join(', ')}`
    );
  }

  #orderTasks() {
    let error;
    const graph = new DepGraph();
    let parallel;
    let sequential;

    for (const [task] of this.#nameToTask) {
      graph.addNode(task);
    }

    for (const [dependent] of this.#deps) {
      const unknownDeps = [];

      for (const dependency of this.#deps.get(dependent)) {
        if (!this.#nameToTask.has(dependency)) {
          unknownDeps.push(dependency);
        } else {
          graph.addDependency(dependent, dependency);
        }

        if (unknownDeps.length) {
          error = this.#newUnknownDepsError(dependency, unknownDeps);
          break;
        }
      }
    }

    if (!error) {
      try {
        // Get standalone tasks with no dependencies and no dependents.
        parallel = graph.overallOrder(true).filter((task) => !graph.dependentsOf(task).length);
        // Get tasks with dependencies, in a correctly ordered list.
        sequential = graph.overallOrder().filter((task) => !parallel.includes(task));
      } catch (e) {
        error = this.#newDependencyCycleError(e.cyclePath);
      }
    }

    return {
      error,
      parallel,
      sequential,
    };
  }

  #rejectIfRunning() {
    if (this.running) {
      return Promise.reject(this.#newStateError());
    }

    return null;
  }

  #throwIfRunning() {
    if (this.running) {
      throw this.#newStateError();
    }
  }

  addTask(task) {
    ow(task, v.checkTaskOrString);

    this.#throwIfRunning();

    this.#nameToTask.set(task.name, task);
    if (task.dependsOn) {
      this.#deps.set(task.name, task.dependsOn);
    }
    this.#taskToName.set(task, task.name);
    this.#addTaskEmitters(task);

    return this;
  }

  addTasks(tasks) {
    ow(tasks, ow.any(ow.array, ow.object));
    this.#addOrRemoveTasks(tasks, this.addTask, 'add');

    return this;
  }

  end() {
    this.emit('end', {
      error: this.#error,
    });
    this.#queue.clear();
    this.#init();
  }

  removeTask(task) {
    let unsubscribers;

    ow(task, v.checkTaskOrString);
    this.#throwIfRunning();

    if (_.isString(task)) {
      task = this.#nameToTask.get(task);

      if (!task) {
        throw new v.UnknownTaskError(`Unknown task: ${task}`);
      }
    } else if (_.isObject(task)) {
      if (!this.#taskToName.has(task)) {
        throw new v.UnknownTaskError(`Unknown task: ${task}`);
      }
    }

    this.#nameToTask.delete(task.name);
    this.#taskToName.delete(task);
    this.#deps.delete(task.name);

    unsubscribers = this.#unsubscribers.get(task.name);
    for (const u of Object.keys(unsubscribers)) {
      unsubscribers[u]();
    }
    this.#unsubscribers.delete(task.name);

    return this;
  }

  removeTasks(tasks) {
    ow(tasks, ow.any(ow.array, ow.object));
    this.#addOrRemoveTasks(tasks, this.removeTask, 'remove');

    return this;
  }

  run(context) {
    ow(context, ow.optional.object);

    let endPromise;
    const { error, parallel, sequential } = this.#orderTasks();
    let runningPromise;
    let taskFuncs = [];
    let taskSequence;

    // First, fail if the runner is already running.
    runningPromise = this.#rejectIfRunning();
    if (runningPromise) {
      return runningPromise;
    }

    // Then fail if the tasks couldn't be ordered.
    if (error) {
      return Promise.reject(error);
    }

    this.#context = context || this.#context;

    for (const taskName of parallel) {
      taskFuncs.push(this.#bindTaskFunc(this.#nameToTask.get(taskName)));
    }

    taskSequence = this.#createTaskSequence(sequential);
    if (taskSequence) {
      taskFuncs.push(taskSequence);
    }

    endPromise = this.#queue.addAll(taskFuncs).then(
      () => {
        this.end();

        if (this.#error) {
          return Promise.reject(this.#error);
        } else {
          return Promise.resolve();
        }
      },
      (e) => {
        this.end();

        return Promise.reject(e);
      }
    );

    this.emit('start');
    this.#running = true;
    try {
      this.#queue.start();

      return endPromise;
    } catch (e) {
      this.#error = e;
      this.end();

      return Promise.reject(e);
    }
  }

  get running() {
    return this.#running;
  }

  get tasks() {
    const entries = [];

    for (const entry of this.#nameToTask.entries()) {
      entries.push(entry);
    }

    return _.fromPairs(entries);
  }
}
