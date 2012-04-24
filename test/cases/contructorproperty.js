// Simple inheritance model with correct constructor
function Test() {}
function Test2() { Test.call(this); }
Test2.prototype = Object.create(Test.prototype, {constructor: {value: Test2}});