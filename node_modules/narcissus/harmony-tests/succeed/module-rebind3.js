module M {
    export var foo = 42;
    export module N {
        module M;
        export var foo = M.foo
    }
}

assertEq(M.foo, M.N.foo);
