module M {
    export var foo = "foo";
}

assertEq(eval("module M { export var bar = 'bar' } import M.bar; bar"), "bar");
