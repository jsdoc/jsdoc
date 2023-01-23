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
describe('@jsdoc/doclet/lib/schema', () => {
  // We test the content of the schema in the `jsdoc` package, where we validate all of the parse
  // results that were created while running other tests.
  const schema = require('../../../lib/schema');

  it('is an object', () => {
    expect(schema).toBeObject();
  });

  it('exports a `BUGS_SCHEMA` object', () => {
    expect(schema.BUGS_SCHEMA).toBeObject();
  });

  it('exports a `CONTACT_INFO_SCHEMA` object', () => {
    expect(schema.CONTACT_INFO_SCHEMA).toBeObject();
  });

  it('exports a `DOCLET_SCHEMA` object', () => {
    expect(schema.DOCLET_SCHEMA).toBeObject();
  });

  it('exports a `DOCLETS_SCHEMA` object', () => {
    expect(schema.DOCLETS_SCHEMA).toBeObject();
  });

  it('exports an `ENUM_PROPERTY_SCHEMA` object', () => {
    expect(schema.ENUM_PROPERTY_SCHEMA).toBeObject();
  });

  it('exports a `META_SCHEMA` object', () => {
    expect(schema.META_SCHEMA).toBeObject();
  });

  it('exports a `PACKAGE_SCHEMA` object', () => {
    expect(schema.PACKAGE_SCHEMA).toBeObject();
  });

  it('exports a `PARAM_SCHEMA` object', () => {
    expect(schema.PARAM_SCHEMA).toBeObject();
  });

  it('exports a `TYPE_PROPERTY_SCHEMA` object', () => {
    expect(schema.TYPE_PROPERTY_SCHEMA).toBeObject();
  });
});
