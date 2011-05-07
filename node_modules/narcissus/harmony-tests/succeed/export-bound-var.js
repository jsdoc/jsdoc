module M {
    import N.x;
    export x;
}

module N {
    var x = 42;
    export x;
}

assertEq(M.x, 42);
assertEq(N.x, 42);
