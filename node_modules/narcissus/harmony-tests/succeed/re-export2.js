module M {
    export module N {
        export var foo = 42;
        export var bar = "hello world";
    }
}

module Q {
    module MN = M.N;
    export {
        foo: MN.bar,
        bar: MN.foo
    }
}

assertEq(Q.foo, "hello world");
assertEq(Q.bar, 42);
assertEq(Q.foo, M.N.bar);
assertEq(Q.bar, M.N.foo);
