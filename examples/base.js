// Example of how to document code in written in the style of something
// like Dean Edwards' base2.js library


var Animal = Class.extend({
	/**
	 * @constructor Animal
	 */
	constructor: function(name) {
	
		/**
		 * An instance property.
		 * @property {string} Animal#name
		 */
		this.name = name;
	},
	
	/**
	 * A static property.
	 * @property {string} Animal.name
	 */
	name: "",

	/**
	 * @method Animal#eat
	 */
	eat: function() {
		this.speak("Yum!");
	},

	/**
	 * @method Animal#speak
	 * @param {string} message
	 */
	speak: function(message) {
		alert(this.name + ": " + message);
	}
});

/**
 * @constructor Snake
 * @extends Animal
 */
var Snake = Animal.extend({

	/**
	 * The sound a snake makes?
  	 * @method Snake#hiss
  	 */
	hiss: function() {
		this._super.speak('hissssss');
	}
});

/**
 * @constructor Cat
 * @extends Animal
 */
var Cat = Animal.extend({

	/**
  	 * @method Cat#meow
  	 */
	meow: function() {
		this._super.speak('meow');
	},
	
	/**
	 * Mixin a method from another class.
  	 * @name Cat#hiss => Snake#hiss
  	 */
	hiss: Snake.prototype.hiss
});