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
import ow from 'ow';

import { Task } from './task.js';

function checkTask(t) {
  return {
    validator: t instanceof Task,
    message: `Expected ${t} to be a Task object`,
  };
}

export default {
  checkTaskOrString: ow.any(ow.object.validate(checkTask), ow.string),
  DependencyCycleError: class DependencyCycleError extends Error {
    constructor(message, cyclePath) {
      ow(message, ow.string);
      ow(cyclePath, ow.array.ofType(ow.string));
      super(message);

      this.cyclePath = cyclePath;
      this.name = 'DependencyCycleError';
    }
  },
  StateError: class StateError extends Error {
    constructor(message) {
      ow(message, ow.string);
      super(message);

      this.name = 'StateError';
    }
  },
  UnknownDependencyError: class UnknownDependencyError extends Error {
    constructor(message) {
      ow(message, ow.string);
      super(message);

      this.name = 'UnknownDependencyError';
    }
  },
  UnknownTaskError: class UnknownTaskError extends Error {
    constructor(message) {
      ow(message, ow.string);
      super(message);

      this.name = 'UnknownTaskError';
    }
  },
};
