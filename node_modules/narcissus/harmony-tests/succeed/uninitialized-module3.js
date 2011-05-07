var saved;

module M {
    module N {
        saved = M.O.P;
    }
    export module O {
        export module P {
            export var foo = 42;
        }
    }
}

assertEq(saved.foo, 42);
