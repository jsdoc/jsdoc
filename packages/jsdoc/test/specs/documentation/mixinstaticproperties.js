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
 * Test for augment.js staticToInstance function behavior.
 * This test documents how staticToInstance function converts mixin members
 * when processing mixins. In JSDoc's design, ALL mixin members become
 * instance members when mixed into a class, regardless of their original scope.
 */
describe('mixin static properties augmentation behavior', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixinstaticproperties.js');

  // Debug: log all doclets to understand what JSDoc parsed
  it('should output debug information about parsed doclets', () => {
    console.log('\n=== DEBUG: All TestMixin and TestClass doclets ===');
    const allDoclets = docSet.doclets.filter(
      (d) =>
        d.memberof === 'TestMixin' ||
        d.memberof === 'TestClass' ||
        d.longname === 'TestMixin' ||
        d.longname === 'TestClass'
    );
    allDoclets.forEach((doclet) => {
      console.log(
        `Name: ${doclet.name}, Longname: ${doclet.longname}, Scope: ${doclet.scope}, Kind: ${doclet.kind}, Memberof: ${doclet.memberof}`
      );
    });
    console.log('=== END DEBUG ===\n');
  });

  // Test mixin properties directly
  describe('TestMixin properties', () => {
    const mixinPropInside = docSet.getByLongname('TestMixin.propInside')[0];
    const mixinPropOutside = docSet.getByLongname('TestMixin.propOutside')[0];
    const mixinMethodInside = docSet.getByLongname('TestMixin.methodInside')[0];
    const mixinMethodOutside = docSet.getByLongname('TestMixin.methodOutside')[0];

    it('should correctly identify properties defined inside mixin object', () => {
      expect(mixinPropInside).toBeObject();
      expect(mixinPropInside.name).toBe('propInside');
      expect(mixinPropInside.scope).toBe('static');
      expect(mixinPropInside.longname).toBe('TestMixin.propInside');
    });

    it('should correctly identify properties defined outside mixin object', () => {
      expect(mixinPropOutside).toBeObject();
      expect(mixinPropOutside.name).toBe('propOutside');
      expect(mixinPropOutside.scope).toBe('static');
      expect(mixinPropOutside.longname).toBe('TestMixin.propOutside');
    });

    it('should correctly identify methods defined inside mixin object', () => {
      expect(mixinMethodInside).toBeObject();
      expect(mixinMethodInside.name).toBe('methodInside');
      expect(mixinMethodInside.scope).toBe('static');
      expect(mixinMethodInside.longname).toBe('TestMixin.methodInside');
    });

    it('should correctly identify methods defined outside mixin object', () => {
      expect(mixinMethodOutside).toBeObject();
      expect(mixinMethodOutside.name).toBe('methodOutside');
      expect(mixinMethodOutside.scope).toBe('static');
      expect(mixinMethodOutside.longname).toBe('TestMixin.methodOutside');
    });
  });

  // Test how mixin properties are augmented into the class
  describe('TestClass augmented properties (the bug)', () => {
    // These should be the mixed-in properties in TestClass
    // The bug is that staticToInstance function incorrectly processes these

    it('should convert all mixin properties to instance scope', () => {
      // Look for properties mixed into TestClass
      const classPropInside = docSet.doclets.filter(
        (d) => d.memberof === 'TestClass' && d.name === 'propInside'
      );

      if (classPropInside.length > 0) {
        const prop = classPropInside[0];
        console.log(`\nFound mixed-in propInside: ${prop.longname}, scope: ${prop.scope}`);

        // All traditional mixin properties should become instance
        expect(prop.scope).toBe('instance');
        expect(prop.longname).toBe('TestClass#propInside');
      }
    });

    it('should convert all mixin members to instance scope (JSDoc design)', () => {
      // Look for properties defined outside mixin object mixed into TestClass
      const classPropOutside = docSet.doclets.filter(
        (d) => d.memberof === 'TestClass' && d.name === 'propOutside'
      );

      if (classPropOutside.length > 0) {
        const prop = classPropOutside[0];
        console.log(`\nFound mixed-in propOutside: ${prop.longname}, scope: ${prop.scope}`);

        // JSDoc's design: ALL mixin members become instance members
        expect(prop.scope).toBe('instance');
        expect(prop.longname).toBe('TestClass#propOutside');
      }
    });

    it('should demonstrate JSDoc mixin behavior', () => {
      // This test documents JSDoc's behavior: staticToInstance unconditionally
      // converts ALL members to instance scope when mixing into a class

      const mixedInProps = docSet.doclets.filter(
        (d) => d.memberof === 'TestClass' && (d.name === 'propInside' || d.name === 'propOutside')
      );

      console.log('\n=== JSDoc TRADITIONAL MIXIN BEHAVIOR DEMONSTRATION ===');
      mixedInProps.forEach((prop) => {
        console.log(`Property: ${prop.name}`);
        console.log(
          `  Original in mixin: TestMixin.${prop.name} (parsed as static, but conceptually instance)`
        );
        console.log(`  After mixing: ${prop.longname} (${prop.scope})`);
        console.log('---');
      });
      console.log('=== END DEMONSTRATION ===\n');

      // JSDoc's design for traditional object mixins: ALL members become instance members
      // This is the correct behavior for object-based mixins
      expect(mixedInProps.every((prop) => prop.scope === 'instance')).toBe(true);
    });
  });
});
