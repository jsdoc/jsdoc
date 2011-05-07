module P {
    module A { export var a = 12 }
    export A
}

module B = P.A, C = P.A, D = P.A;

assertEq(B.a, 12);
assertEq(C.a, 12);
assertEq(D.a, 12);
