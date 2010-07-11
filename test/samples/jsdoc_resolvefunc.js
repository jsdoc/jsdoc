// undocumented
ShapeFactory.prototype = {
	// undocumented
	util: {
		// resolves to: @method ShapeFactory#util.createShape
		/** 
		 * Creates a new {@link Shape} instance.
		 * @return A new {@link Shape}
		 * @type Shape
		 */
		createShape: function() {
			// resolves to: @property ShapeFactory#util.lastShape
			/** Track the most recent shape created. */
			this.lastShape = new Shape();
			
			return this.lastShape;
		}
	}
}

// undocumented
foo = function() {
	// resolves to: @property g
	/** @type {number} */
	this.g = 1;
}

/** @constructor */
Foo = function() {
	// resolves to: @method Foo#bar
	/** two bar */
	this.bar = function(){};
	
	// resolves to: @method Foo~inner
	/** an inner function */
	function inner() {
		
		// resolves to: @method Foo~inner~deep
		/** an nested inner function */
		function deep() {
			// resolves to: @property globalProp
			/** set a property */
			this.globalProp = 1;
		}
	}
}

// resolves to: @method globalFunction
/** a global function */
this.globalFunc = function() {
}