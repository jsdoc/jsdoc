
// note, this plugin doesn't do anything with the @extends tag in the current version. Only the @see tag is affected

// test version 1.0.0
// 11/23/2021
// Karl Miller


/**
 * @external OuterdoccedTests
 * @description Externals can alse use the outerdocs tag.
 * @od Lodash.#snakeCase
 */

/**
 * @classdesc We might want to link an ancestor class we've extended.
 * @extends Phaser.GameObjects.Image 
 * @outerdocs Phaser.GameObjects.Image
 */
class myImage {

    /**
     * We might want to link to something we override
     * @override
     * @outerdocs Phaser.GameObjects.Image#setSize
     */
    setSize() {

    }
}

/**
 * @od BuiltIn.Date A classic JS Date Object
 * @description We might need to reference the javascript core documentation, and we might want to change the link text.
 * @see anotherref
 * @constant
 * @type Date
 */
const date = new Date('Tue Nov 23 2021 01:12:05 GMT-0500');




/**
 * @description We might want to link two different external docs.
 * @outerdocs React.dom-elements#style React docs
 * @outerdocs Web.API.HTMLElement.style MDN docs
 */
const boxStyle = {
    color: 'orange',
    backgroundColor: 'black'
}