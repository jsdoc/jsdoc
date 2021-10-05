describe('jsdoc/tag/validator', () => {
  const _ = require('lodash');
  const { EventBus } = require('@jsdoc/util');
  const tag = require('jsdoc/tag');
  const validator = require('jsdoc/tag/validator');

  const config = jsdoc.deps.get('config');

  it('should exist', () => {
    expect(validator).toBeObject();
  });

  it('should export a validate function', () => {
    expect(validator.validate).toBeFunction();
  });

  describe('validate', () => {
    const dictionary = require('jsdoc/tag/dictionary');

    const allowUnknown = Boolean(config.tags.allowUnknownTags);
    const badTag = { dependencies: jsdoc.deps, title: 'lkjasdlkjfb' };
    const badTag2 = new tag.Tag('type', '{string} I am a string!', null, jsdoc.deps);
    const meta = {
      filename: 'asdf.js',
      lineno: 1,
      comment: 'Better luck next time.',
    };
    const goodTag = new tag.Tag('name', 'MyDocletName', meta, jsdoc.deps); // mustHaveValue
    const goodTag2 = new tag.Tag('ignore', '', meta, jsdoc.deps); // mustNotHaveValue

    function validateTag(theTag) {
      validator.validate(theTag, dictionary.lookUp(theTag.title), meta);
    }

    afterEach(() => {
      config.tags.allowUnknownTags = allowUnknown;
    });

    it('logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is false', () => {
      function validate() {
        config.tags.allowUnknownTags = false;
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('logs an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is does not include it', () => {
      function validate() {
        config.tags.allowUnknownTags = [];
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('does not log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags is true', () => {
      function validate() {
        config.tags.allowUnknownTags = true;
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('does not log an error if the tag is not in the dictionary and conf.tags.allowUnknownTags includes it', () => {
      function validate() {
        config.tags.allowUnknownTags = [badTag.title];
        validateTag(badTag);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('does not log an error for valid tags', () => {
      function validate() {
        validateTag(goodTag);
        validateTag(goodTag2);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeFalse();
    });

    it('logs an error if the tag has no text but mustHaveValue is true', () => {
      function validate() {
        const missingName = _.cloneDeep(goodTag);

        missingName.text = null;
        validateTag(missingName);
      }

      expect(jsdoc.didLog(validate, 'error')).toBeTrue();
    });

    it('logs a warning if the tag has text but mustNotHaveValue is true', () => {
      function validate() {
        const missingText = _.cloneDeep(goodTag2);

        missingText.mustNotHaveValue = true;
        missingText.text = missingText.text || 'asdf';
        validateTag(missingText);
      }

      expect(jsdoc.didLog(validate, 'warn')).toBeTrue();
    });

    it('logs a warning if the tag has a description but mustNotHaveDescription is true', () => {
      function validate() {
        validateTag(badTag2);
      }

      expect(jsdoc.didLog(validate, 'warn')).toBeTrue();
    });

    it('logs meta.comment when present', () => {
      const bus = new EventBus('jsdoc');
      const events = [];

      bus.once('logger:error', (e) => events.push(e));
      config.tags.allowUnknownTags = false;
      validateTag(badTag);

      expect(events[0]).toContain(meta.comment);
    });
  });
});
