/**
 * Construct a new Shape object.
 * @class This is the basic Shape class.  
 * It can be considered an abstract class, even though no such thing
 * really existing in JavaScript
 * @constructor
 * @throws {MemoryException} If there is no more memory 
 * @throws GeneralShapeException rarely (if ever)
 * @return {Shape|Coordinate} A new shape.
 */
function Shape(){
  
   /**
    * This is an example of a function that is not given as a property
    * of a prototype, but instead it is assigned within a constructor.
    * For inner functions like this to be picked up by the parser, the
    * function that acts as a constructor <b>must</b> be denoted with
    * the <b>&#64;constructor</b> tag in its comment.
    * @method
    * @returns {String}
    */
   this.getClassName = function(){
      return "Shape";
   }

   /** 
    * This is an inner method, just used here as an example
    * @method Shape~addReference
    * @private
    * @since version 0.5
    * @author Sue Smart
    */
   function addReference(){
       // Do nothing...
   }
   
}