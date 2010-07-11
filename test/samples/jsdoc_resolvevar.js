
// undocumented
this.globalprop = {
	/** a child property */
	child1: {
		/** a nested child func */
		child2: {}
	}
};

(function ($) {
	var io = {
		/** @property */
		ip: function(){}
	}
})(mylib);

var go = {
	/** @variable */
	gp: true
};

/** @variable */
var foo,
	/** @variable */
	bar;


// undocumented
function globalFunc() {
	/** an inner property */
	var innerProp = 1;
	
 	// an inner function */
 	var innerFunc = function() {
 		/** a nested child func */
 		var nestedProp = 1;
 	}
}
