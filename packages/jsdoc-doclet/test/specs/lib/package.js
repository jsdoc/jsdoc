/*
  Copyright 2014 the JSDoc Authors.

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

import * as jsdocPackage from '../../../lib/package.js';

const { Package } = jsdocPackage;

describe('@jsdoc/doclet/lib/package', () => {
  let emptyPackage;

  function checkPackageProperty(name, value) {
    let myPackage;
    const obj = {};

    obj[name] = value;
    myPackage = new Package(JSON.stringify(obj), jsdoc.deps);
    // Add the package object to the cached parse results, so we can validate it against the
    // doclet schema.
    jsdoc.addParseResults(`package-property-${name}.js`, [myPackage]);

    expect(myPackage[name]).toEqual(value);
  }

  it('is an object', () => {
    expect(jsdocPackage).toBeObject();
  });

  it('exports a `Package` constructor', () => {
    expect(Package).toBeFunction();
  });

  describe('Package', () => {
    beforeEach(() => {
      emptyPackage = new Package(null, jsdoc.deps);
    });

    it('accepts a JSON-format string', () => {
      function newPackage() {
        return new Package('{"foo": "bar"}', jsdoc.deps);
      }

      expect(newPackage).not.toThrow();
    });

    it('accepts a JSON-format string with a leading BOM', () => {
      function newPackage() {
        return new Package('\uFEFF{}', jsdoc.deps);
      }

      expect(newPackage).not.toThrow();
    });

    it('logs an error when called with bad input', () => {
      function newPackage() {
        return new Package('abcdefg', jsdoc.deps);
      }

      expect(newPackage).not.toThrow();
      expect(jsdoc.didLog(newPackage, 'error')).toBeTrue();
    });

    describe('author', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'author')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('author', {
          name: 'Jane Smith',
          email: 'jsmith@example.com',
        });
      });
    });

    describe('bugs', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'bugs')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('bugs', { url: 'http://example.com/bugs' });
      });
    });

    describe('contributors', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'contributors')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('contributors', [
          {
            name: 'Jane Smith',
            email: 'jsmith@example.com',
          },
        ]);
      });
    });

    describe('dependencies', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'dependencies')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('dependencies', { bar: '~1.1.0' });
      });
    });

    describe('description', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'description')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('description', 'My package.');
      });
    });

    describe('devDependencies', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'devDependencies')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('devDependencies', { baz: '~3.4.5' });
      });
    });

    describe('engines', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'engines')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('engines', { node: '>=0.10.3' });
      });
    });

    describe('files', () => {
      it('contains an empty array by default', () => {
        expect(emptyPackage.files).toBeEmptyArray();
      });

      it('ignores the value from the package file', () => {
        const myPackage = new Package('{"files": ["foo", "bar"]}', jsdoc.deps);

        expect(myPackage.files).toBeEmptyArray();
      });
    });

    describe('homepage', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'homepage')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('homepage', 'http://example.com/');
      });
    });

    describe('keywords', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'keywords')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('keywords', ['foo', 'bar']);
      });
    });

    describe('licenses', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'licenses')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('licenses', [
          {
            type: 'My Open-Source License',
            url: 'http://example.com/oss',
          },
        ]);
      });

      it('contains the value of `license` from the package file', () => {
        const myPackage = new Package('{"license": "My-OSS-License"}', jsdoc.deps);

        expect(myPackage.license).toBeUndefined();
        expect(myPackage.licenses).toBeArrayOfSize(1);
        expect(myPackage.licenses[0].type).toBe('My-OSS-License');
      });

      it('combines the `license` and `licenses` properties', () => {
        const packageInfo = {
          license: 'My-OSS-License',
          licenses: [
            {
              type: 'My Open-Source License',
              url: 'http://example.com/oss',
            },
          ],
        };
        const myPackage = new Package(JSON.stringify(packageInfo), jsdoc.deps);

        expect(myPackage.licenses).toBeArrayOfSize(2);
      });
    });

    describe('longname', () => {
      it('defaults to `package:undefined`', () => {
        expect(emptyPackage.longname).toBe('package:undefined');
      });

      it('reflects the value of the `name` property', () => {
        const myPackage = new Package('{"name": "foo"}', jsdoc.deps);

        expect(myPackage.longname).toBe('package:foo');
      });
    });

    describe('main', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'main')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('main', 'foo');
      });
    });

    describe('name', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'name')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('name', 'foo');
      });
    });

    describe('repository', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'repository')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('repository', {
          type: 'git',
          url: 'git@example.org:foo/bar/baz.git',
        });
      });
    });

    describe('version', () => {
      it('does not exist by default', () => {
        expect(Object.hasOwn(emptyPackage, 'version')).toBeFalse();
      });

      it('contains the value from the package file', () => {
        checkPackageProperty('version', '0.1.2');
      });
    });
  });
});
