/*
  Copyright 2012 the JSDoc Authors.

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
/**
 * Dump information about parser events to the console.
 */
import _ from 'lodash';

const EVENT_TYPES = [
  'parseBegin',
  'fileBegin',
  'beforeParse',
  'jsdocCommentFound',
  'symbolFound',
  'newDoclet',
  'fileComplete',
  'parseComplete',
  'processingComplete',
];

function shouldLog(eventType, config) {
  if (config.include && !config.include.includes(eventType)) {
    return false;
  }

  if (config.exclude && config.exclude.includes(eventType)) {
    return false;
  }

  return true;
}

/**
 * Replace AST node objects in events with a placeholder.
 *
 * @param {Object} o - An object whose properties may contain AST node objects.
 * @return {Object} The modified object.
 */
function replaceNodeObjects(o) {
  const OBJECT_PLACEHOLDER = '<Object>';

  if (o.code && o.code.node) {
    // don't break the original object!
    o.code = _.cloneDeep(o.code);
    o.code.node = OBJECT_PLACEHOLDER;
  }

  if (o.doclet && o.doclet.meta && o.doclet.meta.code && o.doclet.meta.code.node) {
    // don't break the original object!
    o.doclet.meta.code = _.cloneDeep(o.doclet.meta.code);
    o.doclet.meta.code.node = OBJECT_PLACEHOLDER;
  }

  if (o.astnode) {
    o.astnode = OBJECT_PLACEHOLDER;
  }

  return o;
}

/**
 * Get rid of unwanted crud in an event object.
 *
 * @param {object} e The event object.
 * @param {object} config The plugin config.
 * @return {object} The fixed-up object.
 */
function cleanse(e, config) {
  let result = {};

  Object.keys(e).forEach((prop) => {
    // by default, don't stringify properties that contain an array of functions
    if (
      !config.includeFunctions &&
      Array.isArray(e[prop]) &&
      e[prop][0] &&
      String(typeof e[prop][0]) === 'function'
    ) {
      result[prop] = `function[${e[prop].length}]`;
    }
    // never include functions that belong to the object
    else if (typeof e[prop] !== 'function') {
      result[prop] = e[prop];
    }
  });

  // allow users to omit node objects, which can be enormous
  if (config.omitNodes) {
    result = replaceNodeObjects(result);
  }

  return result;
}

const handlers = {};

EVENT_TYPES.forEach((eventType) => {
  handlers[eventType] = (e, { config }) => {
    const pluginConfig = config.eventDumper;

    if (shouldLog(eventType, pluginConfig)) {
      console.log(
        JSON.stringify({
          type: eventType,
          content: cleanse(e, pluginConfig),
        }),
        null,
        4
      );
    }
  };
});

export { handlers };
