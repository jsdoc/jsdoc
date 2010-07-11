// /** A function that does stuff. */
// function doStuff() {
// }
// 
// /**
//  * Shape is an abstract base class. It is defined simply
//  * to have something to inherit from for geometric 
//  * subclasses
//  * @constructor
//  */
// function Shape(color){
// 	this.color = color;
// }
// 
// /**
// * Get the name of the color for this shape
// * @returns A color string for this shape
// */
// Shape.prototype.getColor = function() {
// 	return this.color;
// }
// 
// var x,
// 	/** @return {number} */
// 	getx = function(){},
// 	y;
// 

ShapeFactory.prototype = {
	util: {
		/** 
		 * Creates a new {@link Shape} instance.
		 * @return A new {@link Shape}
		 * @type Shape
		 */
		createShape: function() {
			/** Track the most recent shape created. */
			this.lastShape = new Shape();
			return this.lastShape;
		}
    }
 }