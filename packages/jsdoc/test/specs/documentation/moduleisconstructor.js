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
describe('module that exports a constructor', () => {
  describe('pre-ES2015 module', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleisconstructor.js');
    const modules = docSet.doclets.filter(({ kind }) => kind === 'module');
    const classes = docSet.doclets.filter(({ kind }) => kind === 'class');
    const getId = docSet.getByLongname('module:mymodule/config#getId')[0];
    const id = docSet.getByLongname('module:mymodule/config#id')[0];

    it('should include one doclet whose kind is "module"', () => {
      expect(modules).toBeArrayOfSize(1);
      expect(modules[0].kind).toBe('module');
    });

    it('should include one doclet whose kind is "class"', () => {
      expect(classes).toBeArrayOfSize(1);
      expect(classes[0].kind).toBe('class');
    });

    describe('class doclet', () => {
      it('should include a "description" property that contains the constructor description', () => {
        expect(classes[0].description).toEqual('Create a new configuration.');
      });

      it('should include a "classdesc" property', () => {
        expect(classes[0].classdesc).toEqual('Describe the class here.');
      });
    });

    describe('module doclet', () => {
      it('should include a "description" property that contains the module description', () => {
        expect(modules[0].description).toEqual('Describe the module here.');
      });
    });

    describe('instance members', () => {
      it('should use the correct longname for instance properties', () => {
        expect(id.description).toBe('Document me.');
      });

      it('should use the correct longname for instance methods', () => {
        expect(getId.description).toBe('Get the configuration ID.');
      });
    });
  });

  describe('ES2015 module', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduleisconstructor2.js');
    const modules = docSet.doclets.filter(({ kind }) => kind === 'module');
    const classes = docSet.doclets.filter(
      ({ kind, classdesc, description }) => kind === 'class' && classdesc && description
    );
    const getId = docSet.getByLongname('module:mymodule/config#getId')[0];
    const id = docSet.getByLongname('module:mymodule/config#id')[0];

    it('should include one doclet whose kind is "module"', () => {
      expect(modules).toBeArrayOfSize(1);
      expect(modules[0].kind).toBe('module');
    });

    it('should include one complete class doclet', () => {
      expect(classes).toBeArrayOfSize(1);
      expect(classes[0].kind).toBe('class');
    });

    describe('class doclet', () => {
      it('should include a "description" property that contains the constructor description', () => {
        expect(classes[0].description).toEqual('Create a new configuration.');
      });

      it('should include a "classdesc" property', () => {
        expect(classes[0].classdesc).toEqual('Describe the class here.');
      });
    });

    describe('module doclet', () => {
      it('should include a "description" property that contains the module description', () => {
        expect(modules[0].description).toEqual('Describe the module here.');
      });
    });

    describe('instance members', () => {
      it('should use the correct longname for instance properties', () => {
        expect(id.description).toBe('Document me.');
      });

      it('should use the correct longname for instance methods', () => {
        expect(getId.description).toBe('Get the configuration ID.');
      });
    });
  });
});
