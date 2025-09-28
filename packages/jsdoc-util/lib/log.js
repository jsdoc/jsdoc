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

export const LOG_TYPES = ['debug', 'error', 'info', 'fatal', 'verbose', 'warn'];

/**
 * Logging functions for JSDoc.
 *
 * @typedef {Object} module:@jsdoc/util~logFunctions
 * @property {function(...*)} debug - The `debug` logging function.
 * @property {function(...*)} error - The `error` logging function.
 * @property {function(...*)} info - The `info` logging function.
 * @property {function(...*)} fatal - The `fatal` logging function.
 * @property {function(...*)} verbose - The `verbose` logging function.
 * @property {function(...*)} warn - The `warn` logging function.
 */

/**
 * Creates shared logging functions for JSDoc.
 *
 * Calling a logging function has the following effects:
 *
 * +  The specified `emitter` emits an event with the name `logger:LOG_TYPE`, where `LOG_TYPE` is a
 *    value like `debug` or `verbose`.
 * +  If JSDoc's CLI is running, and if the user asked to see log messages of the specified type,
 *    then the message is written to the console.
 *
 * @alias module:@jsdoc/util.getLogFunctions
 * @param {node:events} emitter - The event emitter to use. In general, you should use the emitter
 *    stored in {@link module:@jsdoc/core.Env#emitter Env#emitter}.
 * @returns {module:@jsdoc/util~logFunctions} The logging functions.
 */
export default function getLogFunctions(emitter) {
  const logFunctions = {};

  LOG_TYPES.forEach((type) => {
    logFunctions[type] = (...args) => emitter.emit(`logger:${type}`, ...args);
  });

  return logFunctions;
}
