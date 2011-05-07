module M {
    export { foo: N.bar };
}

module N {
    export { bar: M.foo };
}
