module M {
    export var foo = 42;
}

assertEq(eval("import M.foo; foo"), 42);
