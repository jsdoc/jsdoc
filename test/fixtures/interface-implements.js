/** @interface */
function ITester() {}
ITester.prototype.beforeEach = function() {};
ITester.prototype.it = function() {};

/**
 * @constructor
 * @implements {ITester}
 */
function MyTester() {}
MyTester.prototype.beforeEach = function() {};
MyTester.prototype.it = function() {};
