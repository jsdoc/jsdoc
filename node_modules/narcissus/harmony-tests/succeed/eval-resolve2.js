var foo = (function(x) { return eval("x") })("foo");

assertEq(foo, "foo");
