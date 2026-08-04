/**
 * Test ES6 class-based mixin with static and instance properties.
 * This tests both ways of defining static members in ES6 classes.
 * @mixin ES6TestMixin
 */
class ES6TestMixin {
  /**
   * Instance property defined in class body.
   * @type {string}
   */
  instanceProp = 'instance';

  /**
   * Static property defined with static keyword inside class.
   * @type {string}
   */
  static staticPropInside = 'static inside';

  /**
   * Instance method.
   * @returns {string} Instance method result.
   */
  instanceMethod() {
    return 'instance method';
  }

  /**
   * Static method defined with static keyword inside class.
   * @returns {string} Static method result.
   */
  static staticMethodInside() {
    return 'static method inside';
  }
}

/**
 * Static property defined outside class (attached to class object).
 * @type {string}
 * @memberof ES6TestMixin
 */
ES6TestMixin.staticPropOutside = 'static outside';

/**
 * Static method defined outside class (attached to class object).
 * @returns {string} Static method result.
 * @memberof ES6TestMixin
 */
ES6TestMixin.staticMethodOutside = function() {
  return 'static method outside';
};

/**
 * Test class that uses the ES6 mixin.
 * @class ES6TestClass
 * @mixes ES6TestMixin
 */
class ES6TestClass extends ES6TestMixin {
  /**
   * Class-specific property.
   * @type {string}
   */
  classProp = 'class';
}
