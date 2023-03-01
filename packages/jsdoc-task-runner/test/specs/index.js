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
import taskRunner from '../../index.js';
import { Task } from '../../lib/task.js';
import { TaskRunner } from '../../lib/task-runner.js';

describe('@jsdoc/task-runner', () => {
  it('is an object', () => {
    expect(taskRunner).toBeObject();
  });

  describe('Task', () => {
    it('is lib/task', () => {
      expect(taskRunner.Task).toEqual(Task);
    });
  });

  describe('TaskRunner', () => {
    it('is lib/task-runner', () => {
      expect(taskRunner.TaskRunner).toEqual(TaskRunner);
    });
  });
});
