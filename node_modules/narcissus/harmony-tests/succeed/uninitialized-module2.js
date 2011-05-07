var saved = M.N;

module M {
    export module N {
        export var foo = 42;
    }
}

assertEq(saved.foo, 42);
