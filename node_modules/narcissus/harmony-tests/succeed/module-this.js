var saved;

module M {
    saved = this;
    export var foo = 42;
}

assertEq("foo" in saved, true);
