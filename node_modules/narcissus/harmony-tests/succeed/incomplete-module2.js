var saved;

module M {
    export var foo = 42;
    var tmp = M;
    saved = tmp.foo;
}

assertEq(saved, 42);
