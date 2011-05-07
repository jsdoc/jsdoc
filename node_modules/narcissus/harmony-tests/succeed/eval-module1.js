module M {
    export var foo = "foo";
}

var foo = M.foo;
var bar = eval("module M { export var bar = 'bar'; } M.bar");

assertEq(foo, "foo");
assertEq(bar, "bar");
