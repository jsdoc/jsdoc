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
const Ajv = require('ajv');
const { schema } = require('@jsdoc/doclet');

describe('validate parse results', () => {
  const ajv = new Ajv({
    allErrors: true,
    ownProperties: true,
  });
  const validate = ajv.compile(schema.DOCLETS_SCHEMA);

  it('finds validation errors in bogus input', () => {
    const doclets = [
      {
        foo: 'bar',
      },
    ];
    const isValid = validate(doclets);

    expect(isValid).toBeFalse();
  });

  it('finds no validation errors in the JSDoc parse results', () => {
    jsdoc.getParseResults().forEach((doclets) => {
      const isValid = validate(doclets.doclets);

      // Hack to get the filename/errors in the test results.
      if (!isValid) {
        expect(doclets.filename).toBe('');
        expect(validate.errors).toBeEmptyArray();
      } else {
        expect(validate.errors).toBeNull();
      }
    });
  });
});
