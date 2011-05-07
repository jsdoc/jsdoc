var saved = M;

module M {
    export var foo = 42;
}

assertEq(saved.foo, 42);
