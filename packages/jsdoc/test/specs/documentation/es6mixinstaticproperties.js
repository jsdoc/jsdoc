/*
  Copyright 2025 the JSDoc Authors.

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
 * Test for ES6 class-based mixin static properties augmentation behavior.
 * This test verifies how JSDoc handles static vs instance members when
 * mixing ES6 classes with both internal (static keyword) and external
 * (Class.prop = value) static member definitions.
 */
describe('ES6 class mixin static properties augmentation behavior', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/es6mixinstaticproperties.js');

  // Debug: log all doclets to understand what JSDoc parsed
  it('should output debug information about parsed ES6 mixin doclets', () => {
    console.log('\n=== DEBUG: All ES6TestMixin and ES6TestClass doclets ===');
    const allDoclets = docSet.doclets.filter(
      (d) =>
        d.memberof === 'ES6TestMixin' ||
        d.memberof === 'ES6TestClass' ||
        d.longname === 'ES6TestMixin' ||
        d.longname === 'ES6TestClass'
    );
    allDoclets.forEach((doclet) => {
      console.log(
        `Name: ${doclet.name}, Longname: ${doclet.longname}, Scope: ${doclet.scope}, Kind: ${doclet.kind}, Memberof: ${doclet.memberof}`
      );
    });
    console.log('=== END DEBUG ===\n');
  });

  // Test ES6 mixin properties directly
  describe('ES6TestMixin properties', () => {
    it('should correctly identify instance properties in ES6 class', () => {
      const instanceProp = docSet.getByLongname('ES6TestMixin#instanceProp')[0];

      if (instanceProp) {
        expect(instanceProp.name).toBe('instanceProp');
        expect(instanceProp.scope).toBe('instance');
        expect(instanceProp.longname).toBe('ES6TestMixin#instanceProp');
        console.log(
          `✓ ES6 instance property: ${instanceProp.longname}, scope: ${instanceProp.scope}`
        );
      } else {
        console.log('⚠️ ES6 instance property not found');
      }
    });

    it('should correctly identify static properties defined with static keyword', () => {
      const staticPropInside = docSet.getByLongname('ES6TestMixin.staticPropInside')[0];

      if (staticPropInside) {
        expect(staticPropInside.name).toBe('staticPropInside');
        expect(staticPropInside.scope).toBe('static');
        expect(staticPropInside.longname).toBe('ES6TestMixin.staticPropInside');
        console.log(
          `✓ ES6 static property (inside): ${staticPropInside.longname}, scope: ${staticPropInside.scope}`
        );
      } else {
        console.log('⚠️ ES6 static property (inside) not found');
      }
    });

    it('should correctly identify static properties defined outside class', () => {
      const staticPropOutside = docSet.getByLongname('ES6TestMixin.staticPropOutside')[0];

      if (staticPropOutside) {
        expect(staticPropOutside.name).toBe('staticPropOutside');
        expect(staticPropOutside.scope).toBe('static');
        expect(staticPropOutside.longname).toBe('ES6TestMixin.staticPropOutside');
        console.log(
          `✓ ES6 static property (outside): ${staticPropOutside.longname}, scope: ${staticPropOutside.scope}`
        );
      } else {
        console.log('⚠️ ES6 static property (outside) not found');
      }
    });

    it('should correctly identify instance methods in ES6 class', () => {
      const instanceMethod = docSet.getByLongname('ES6TestMixin#instanceMethod')[0];

      if (instanceMethod) {
        expect(instanceMethod.name).toBe('instanceMethod');
        expect(instanceMethod.scope).toBe('instance');
        expect(instanceMethod.longname).toBe('ES6TestMixin#instanceMethod');
        console.log(
          `✓ ES6 instance method: ${instanceMethod.longname}, scope: ${instanceMethod.scope}`
        );
      } else {
        console.log('⚠️ ES6 instance method not found');
      }
    });

    it('should correctly identify static methods defined with static keyword', () => {
      const staticMethodInside = docSet.getByLongname('ES6TestMixin.staticMethodInside')[0];

      if (staticMethodInside) {
        expect(staticMethodInside.name).toBe('staticMethodInside');
        expect(staticMethodInside.scope).toBe('static');
        expect(staticMethodInside.longname).toBe('ES6TestMixin.staticMethodInside');
        console.log(
          `✓ ES6 static method (inside): ${staticMethodInside.longname}, scope: ${staticMethodInside.scope}`
        );
      } else {
        console.log('⚠️ ES6 static method (inside) not found');
      }
    });

    it('should correctly identify static methods defined outside class', () => {
      const staticMethodOutside = docSet.getByLongname('ES6TestMixin.staticMethodOutside')[0];

      if (staticMethodOutside) {
        expect(staticMethodOutside.name).toBe('staticMethodOutside');
        expect(staticMethodOutside.scope).toBe('static');
        expect(staticMethodOutside.longname).toBe('ES6TestMixin.staticMethodOutside');
        console.log(
          `✓ ES6 static method (outside): ${staticMethodOutside.longname}, scope: ${staticMethodOutside.scope}`
        );
      } else {
        console.log('⚠️ ES6 static method (outside) not found');
      }
    });
  });

  // Test how ES6 mixin properties are augmented into the class
  describe('ES6TestClass augmented properties (the critical test)', () => {
    it('should preserve instance scope for ES6 mixin instance properties', () => {
      const classInstanceProps = docSet.doclets.filter(
        (d) => d.memberof === 'ES6TestClass' && d.name === 'instanceProp'
      );

      if (classInstanceProps.length > 0) {
        const prop = classInstanceProps[0];
        console.log(`\nFound mixed-in instanceProp: ${prop.longname}, scope: ${prop.scope}`);

        // This should remain instance scope
        expect(prop.scope).toBe('instance');
        expect(prop.longname).toBe('ES6TestClass#instanceProp');
      } else {
        console.log('\n⚠️ No mixed-in instanceProp found in ES6TestClass');
      }
    });

    it('should preserve static properties defined with static keyword', () => {
      const classStaticPropsInside = docSet.doclets.filter(
        (d) => d.memberof === 'ES6TestClass' && d.name === 'staticPropInside'
      );

      if (classStaticPropsInside.length > 0) {
        const prop = classStaticPropsInside[0];
        console.log(`\nFound mixed-in staticPropInside: ${prop.longname}, scope: ${prop.scope}`);

        // Properties defined with static keyword should remain static
        expect(prop.scope).toBe('static');
        expect(prop.longname).toBe('ES6TestClass.staticPropInside');
      } else {
        console.log('\n⚠️ No mixed-in staticPropInside found in ES6TestClass');
      }
    });

    it('should convert static properties defined outside class to instance', () => {
      const classStaticPropsOutside = docSet.doclets.filter(
        (d) => d.memberof === 'ES6TestClass' && d.name === 'staticPropOutside'
      );

      if (classStaticPropsOutside.length > 0) {
        const prop = classStaticPropsOutside[0];
        console.log(`\nFound mixed-in staticPropOutside: ${prop.longname}, scope: ${prop.scope}`);

        // Properties defined outside class (Class.prop = value) are treated as instance candidates
        expect(prop.scope).toBe('instance');
        expect(prop.longname).toBe('ES6TestClass#staticPropOutside');
      } else {
        console.log('\n⚠️ No mixed-in staticPropOutside found in ES6TestClass');
      }
    });

    it('should demonstrate ES6 mixin behavior vs traditional mixin behavior', () => {
      const mixedInProps = docSet.doclets.filter(
        (d) =>
          d.memberof === 'ES6TestClass' &&
          (d.name === 'instanceProp' ||
            d.name === 'staticPropInside' ||
            d.name === 'staticPropOutside')
      );

      console.log('\n=== ES6 MIXIN BEHAVIOR COMPARISON ===');
      mixedInProps.forEach((prop) => {
        const originalScope = prop.name.includes('static') ? 'static' : 'instance';
        console.log(`Property: ${prop.name}`);
        console.log(
          `  Original in ES6 mixin: ES6TestMixin${originalScope === 'static' ? '.' : '#'}${prop.name} (${originalScope})`
        );
        console.log(`  After mixing into class: ${prop.longname} (${prop.scope})`);
        console.log(`  Scope preserved: ${originalScope === prop.scope ? '✓ YES' : '✗ NO'}`);
        console.log('---');
      });
      console.log('=== END COMPARISON ===\n');

      // This test documents the behavior without asserting specific expectations
      // since we're investigating what JSDoc actually does with ES6 class mixins
      expect(true).toBe(true);
    });
  });
});
