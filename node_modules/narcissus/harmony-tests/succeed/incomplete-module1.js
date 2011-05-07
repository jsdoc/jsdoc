var saved;

module M {
    saved = M;
    export var foo = 42;
}

assertEq("foo" in saved, true);
