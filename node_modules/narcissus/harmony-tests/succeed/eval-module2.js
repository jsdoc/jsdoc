var M1 = eval("module M { } M");
var M2 = eval("module M { } M");

assertEq(M1 === M2, false);
