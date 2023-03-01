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
import ow from 'ow';

export class Task extends Emittery {
  constructor(opts = {}) {
    let deps;

    super();

    ow(opts.name, ow.optional.string);
    ow(opts.func, ow.optional.function);
    ow(opts.dependsOn, ow.any(ow.optional.string, ow.optional.array.ofType(ow.string)));

    if (typeof opts.dependsOn === 'string') {
      deps = [opts.dependsOn];
    } else if (Array.isArray(opts.dependsOn)) {
      deps = opts.dependsOn.slice();
    }

    this.name = opts.name || null;
    this.func = opts.func || null;
    this.dependsOn = deps || [];
  }

  run(context) {
    ow(this.name, ow.string);
    ow(this.func, ow.function);
    ow(this.dependsOn, ow.array.ofType(ow.string));

    this.emit('start', this);

    return this.func(context).then(
      () => {
        this.emit('end', this);

        return Promise.resolve();
      },
      (error) => {
        this.emit('error', {
          task: this,
          error,
        });
        this.emit('end', this);

        return Promise.reject(error);
      }
    );
  }
}
