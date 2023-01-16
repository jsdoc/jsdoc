/*
  Copyright 2013 the JSDoc Authors.

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
/* global jsdoc */
describe('@jsdoc/tag/lib/validator', () => {
  const _ = require('lodash');
  const { EventBus } = require('@jsdoc/util');
  const { Tag } = require('../../../lib/tag');
  const validator = require('../../../lib/validator');

  const config = jsdoc.deps.get('config');

  it('is an object', () => {
    expect(validator).toBeObject();
  });

  it('exports a `validate` function', () => {
    expect(validator.validate).toBeFunction();
  });

  describe('validate', () => {
    const dictionary = jsdoc.deps.get('tags');

    const allowUnknown = Boolean(config.tags.allowUnknownTags);
    const badTag = { dependencies: jsdoc.deps, title: 'lkjasdlkjfb' };
    const badTag2 = new Tag('type', '{string} I am a string!', null, jsdoc.deps);
    const meta = {
      filename: 'asdf.js',
      lineno: 1,
      comment: 'Better luck next time.',
    };
    const mustHaveValueTag = new Tag('name', 'MyDocletName', meta, jsdoc.deps);
    const mustNotHaveValueTag = new Tag('ignore', '', meta, jsdoc.deps);

    function validateTag(theTag) {
      validator.validate(theTag, dictionary.lookUp(theTag.title), meta);
    }

    afterEach(() => {
      config.tags.allowUnknownTags = allowUnknown;
    });

    it('logs an error if the tag is not defined and unknown tags are not allowed', () => {
      function validate() {
        config.tags.allowUnknownTags = false;
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('logs an error if the tag is not defined and this unknown tag is not allowed', () => {
      function validate() {
        config.tags.allowUnknownTags = [];
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('does not log an error if the tag is not defined, but unknown tags are allowed', () => {
      function validate() {
        config.tags.allowUnknownTags = true;
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('does not log an error if the tag is not defined, but this unknown tag is allowed', () => {
      function validate() {
        config.tags.allowUnknownTags = [badTag.title];
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('does not log an error for valid tags', () => {
      function validate() {
        validateTag(mustHaveValueTag);
        validateTag(mustNotHaveValueTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('logs an error if the tag has no text but is required to', () => {
      function validate() {
        const missingName = _.cloneDeep(mustHaveValueTag);

        missingName.text = null;
        validateTag(missingName);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('logs a warning if the tag has text but is required not to', () => {
      function validate() {
        const missingText = _.cloneDeep(mustNotHaveValueTag);

        missingText.mustNotHaveValue = true;
        missingText.text = missingText.text || 'asdf';
        validateTag(missingText);
      }

      expect(jsdoc.didLog(validate, 'warn')).toBeTrue();
    });

    it('logs a warning if the tag has a description but is required not to', () => {
      function validate() {
        validateTag(badTag2);
      }

      expect(jsdoc.didLog(validate, 'warn')).toBeTrue();
    });

    it('logs the offending comment for validation errors', () => {
      const bus = new EventBus('jsdoc');
      const events = [];

      bus.once('logger:error', (e) => events.push(e));
      config.tags.allowUnknownTags = false;
      validateTag(badTag);

      expect(events[0]).toContain(meta.comment);
    });
  });
});
