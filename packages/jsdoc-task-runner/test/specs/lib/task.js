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
import Emittery from 'emittery';

import { Task } from '../../../lib/task.js';

const ARGUMENT_ERROR = 'ArgumentError';

describe('@jsdoc/task-runner/lib/task', () => {
  it('is a function', () => {
    expect(Task).toBeFunction();
  });

  it('inherits from emittery', () => {
    expect(new Task() instanceof Emittery).toBeTrue();
  });

  it('can be constructed with no arguments', () => {
    function factory() {
      return new Task();
    }

    expect(factory).not.toThrow();
  });

  it('uses the provided name', () => {
    const task = new Task({ name: 'foo' });

    expect(task.name).toBe('foo');
  });

  it('lets you define a name in a subclass', () => {
    class MyTask extends Task {
      constructor() {
        super();

        this._name = 'myTask';
      }

      get name() {
        return this._name;
      }
    }

    const task = new MyTask();

    expect(task.name).toBe('myTask');
  });

  it('uses the provided function', () => {
    const func = () => Promise.resolve();
    const task = new Task({ func });

    expect(task.func).toBe(func);
  });

  it('lets you define a function in a subclass', async () => {
    let success;
    let task;

    class MyTask extends Task {
      func() {
        success = true;

        return Promise.resolve();
      }
    }

    task = new MyTask({ name: 'myTask' });
    await task.run();

    expect(success).toBeTrue();
  });

  describe('dependsOn', () => {
    it('accepts an array of task names as dependencies', () => {
      const dependsOn = ['bar', 'baz'];
      const task = new Task({
        name: 'foo',
        func: () => Promise.resolve(),
        dependsOn,
      });

      expect(task.dependsOn).toEqual(dependsOn);
    });

    it('accepts a single task name as a dependency', () => {
      const task = new Task({
        name: 'foo',
        func: () => Promise.resolve(),
        dependsOn: 'bar',
      });

      expect(task.dependsOn).toEqual(['bar']);
    });

    it('fails with non-string, non-array dependencies', () => {
      function factory() {
        return new Task({
          name: 'foo',
          func: () => Promise.resolve(),
          dependsOn: 7,
        });
      }

      expect(factory).toThrowErrorOfType(ARGUMENT_ERROR);
    });

    it('fails with non-string arrays of dependencies', () => {
      function factory() {
        return new Task({
          name: 'foo',
          func: () => Promise.resolve(),
          dependsOn: [7],
        });
      }

      expect(factory).toThrowErrorOfType(ARGUMENT_ERROR);
    });
  });

  it('uses the provided dependencies', () => {
    const dependsOn = ['foo', 'bar'];
    const task = new Task({ dependsOn });

    expect(task.dependsOn).toEqual(dependsOn);
  });

  describe('run', () => {
    it('requires a name', async () => {
      let error;

      async function start() {
        const task = new Task({
          func: () => Promise.resolve(),
        });

        await task.run();
      }

      try {
        await start();
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });

    it('requires a function', async () => {
      let error;

      async function run() {
        const task = new Task({
          name: 'foo',
        });

        await task.run();
      }

      try {
        await run();
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });

    it('accepts a context object', async () => {
      const context = {};
      const task = new Task({
        name: 'foo',
        func: (c) => {
          c.foo = 'bar';

          return Promise.resolve();
        },
      });

      await task.run(context);

      expect(context.foo).toBe('bar');
    });

    describe('events', () => {
      it('emits a `start` event', async () => {
        let event;
        const task = new Task({
          name: 'foo',
          func: () => Promise.resolve(),
        });

        task.on('start', (e) => {
          event = e;
        });

        await task.run();

        expect(event).toBe(task);
      });

      it('emits an `end` event', async () => {
        let event;
        const task = new Task({
          name: 'foo',
          func: () => Promise.resolve(),
        });

        task.on('end', (e) => {
          event = e;
        });

        await task.run();

        expect(event).toBe(task);
      });

      it('emits an `error` event if necessary', async () => {
        let error = new Error('oh no!');
        let event;
        const task = new Task({
          name: 'foo',
          func: () => Promise.reject(error),
        });

        task.on('error', (e) => {
          event = e;
        });

        try {
          await task.run();
        } catch (e) {
          // Expected behavior.
        }

        expect(event.error).toBe(error);
        expect(event.task).toBe(task);
      });
    });
  });
});
