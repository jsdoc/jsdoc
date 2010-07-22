 
 	/** @namespace foo */
 	
 	/** @constructor bar */
 	
 	/**
 		@method fah
 		@memberof foo#
 	 */
 	
 	/**
 		@property bah
 		@member bar
 	 */
 	 
 	 /**
 	 	@inner
 		@property bish
 		@member bar
 	 */
 	 
 	 /**
 	 	@scope instance
 		@property bosh
 		@member bar
 	 */
 	 
	 /** An unnamed aliased static var
		@static
		@property
		@memberof foo
	*/
	var bar = 1;
	var foo = function() {}; foo.bar = bar;
	
	/** An unnamed, aliased inner var
		@inner
		@property
		@memberof foz
	*/
	var baz = 1;
	(function(v) {
		foz = function() {var baz = v; };
	})(baz);