module A {
    import B.foo;
    var x = foo;
}

module B {
    export var foo = 12;
}
