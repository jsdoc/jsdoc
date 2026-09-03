/**
 * Test mixin with properties and methods for augment.js behavior testing.
 * @mixin TestMixin
 */
var TestMixin = {
  /**
   * Property defined inside mixin object.
   * @type {string}
   */
  propInside: 'inside',

  /**
   * Method defined inside mixin object.
   * @returns {string} Method result.
   */
  methodInside: function() {
    return 'inside';
  }
};

/**
 * Property defined outside mixin object.
 * @type {string}
 * @memberof TestMixin
 */
TestMixin.propOutside = 'outside';

/**
 * Method defined outside mixin object.
 * @returns {string} Method result.
 * @memberof TestMixin
 */
TestMixin.methodOutside = function() {
  return 'outside';
};

/**
 * Test class that uses the mixin.
 * @class TestClass
 * @mixes TestMixin
 */
function TestClass() {
  /**
   * Class-specific property.
   * @type {string}
   */
  this.classProp = 'class';
}
