/**
 * @interface
 */
function ITester() {}
ITester.prototype.hello = '123';
ITester.prototype.beforeEach = function() {};
ITester.prototype.it = function() {};

/**
 * @constructor
 * @implements {ITester}
 */
function MyTester() {}
/**
 * my tester's beforeEach method.
 */
MyTester.prototype.beforeEach = function() {};
MyTester.prototype.it = function() {};

/**
 * @interface
 */
function IWorker() {}
IWorker.prototype.work = function() {};

/**
 * @constructor
 * @implements {IWorker}
 */
function MyWorker() {}
MyWorker.prototype.work = function() {};
MyWorker.prototype.process = function() {};
