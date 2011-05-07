module M {
    export { foo: N.bar };
}

module N {
    export { bar: O.baz };
}

module O {
    export { baz: P.buz };
}

module P {
    export { buz: M.foo };
}
