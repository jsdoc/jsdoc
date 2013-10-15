// used to test jsdoc/augments module directly

/**
 * @constructor
 * @classdesc Base class
 */
var Base = function() {
    /** member */
    this.test1 = "base";
    /** another member */
    this.test2 = null;
};

/**
 * @constructor
 * @extends Base
 * @classdesc Extension of Base
 */
var Derived = function() {
    this.test1 = "derived";
};
