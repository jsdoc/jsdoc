
// undocumented
this.globalprop = {
	/** a child property */
	child1: {
		/** a nested child func */
		child2: {} // globalprop.child1.child2
	}
};

(function ($) {
	var io = {
		/** @property */
		ip: function(){} // [[anonymous]]~io.ip
	}
})(mylib);

var go = {
	/** @var */
	gp: true // go.gp
};

/** @var */
var foo,
	/** @var */
	bar;


// undocumented
function globalFunc() {
	/** an inner property */
	var innerProp = 1; // globalFunc~innerProp
	
 	// undocumented inner function
 	var innerFunc = function() {
 		/** a nested child prop */
 		var nestedProp = 1; // globalFunc~innerFunc~nestedProp
 	}
}

var ns = {
	func: function() {
		/** setting prop on objectlit */
		this.prop = 1
	}
}
