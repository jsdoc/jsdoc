module P {
    module A { export var a = 12 }
    export A
}

module B = P.A

assertEq(B.a, 12);
