/*
  Copyright 2010 the JSDoc Authors.

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
 * @module jsdoc/tag/validator
 * @requires jsdoc/tag/dictionary
 */
const { log } = require('@jsdoc/util');

function buildMessage(tagName, { filename, lineno, comment }, desc) {
  let result = `The @${tagName} tag ${desc}. File: ${filename}, line: ${lineno}`;

  if (comment) {
    result += `\n${comment}`;
  }

  return result;
}

/**
 * Validate the given tag.
 */
exports.validate = ({ dependencies, title, text, value }, tagDef, meta) => {
  const config = dependencies.get('config');
  const allowUnknownTags = config.tags.allowUnknownTags;

  // handle cases where the tag definition does not exist
  if (!tagDef) {
    // log an error if unknown tags are not allowed
    if (
      !allowUnknownTags ||
      (Array.isArray(allowUnknownTags) && !allowUnknownTags.includes(title))
    ) {
      log.error(buildMessage(title, meta, 'is not a known tag'));
    }

    // stop validation, since there's nothing to validate against
    return;
  }

  // check for errors that make the tag useless
  if (!text && tagDef.mustHaveValue) {
    log.error(buildMessage(title, meta, 'requires a value'));
  }

  // check for minor issues that are usually harmless
  else if (text && tagDef.mustNotHaveValue) {
    log.warn(buildMessage(title, meta, 'does not permit a value; the value will be ignored'));
  } else if (value && value.description && tagDef.mustNotHaveDescription) {
    log.warn(
      buildMessage(title, meta, 'does not permit a description; the description will be ignored')
    );
  }
};
