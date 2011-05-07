module P { export module A { export var a = 12 } }

module B = P.A

B.a = 13;
