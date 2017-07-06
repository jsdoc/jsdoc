/**
 * @module jsdoc/tutorial
 */
'use strict';

var markdown = require('jsdoc/util/markdown');
var util = require('util');

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Removes child tutorial from the parent. Does *not* unset child.parent though.
 *
 * @param {Tutorial} parent - parent tutorial.
 * @param {Tutorial} child - Old child.
 * @private
 */
function removeChild(parent, child) {
    var index = parent.children.indexOf(child);

    if (index !== -1) {
        parent.children.splice(index, 1);
    }
}

/**
 * Adds a child to the parent tutorial. Does *not* set child.parent though.
 *
 * @param {Tutorial} parent - parent tutorial.
 * @param {Tutorial} child - New child.
 * @private
 */
function addChild(parent, child) {
    parent.children.push(child);
}

/**
 * @class
 * @classdesc Represents a single JSDoc tutorial.
 * @param {string} name - Tutorial name.
 * @param {string} content - Text content.
 * @param {number} type - Source formating.
 */
exports.Tutorial = function(name, content, type) {
    this.title = this.name = this.longname = name;
    this.content = content;
    this.type = type;

    // default values
    this.parent = null;
    this.children = [];
};

/**
 * Moves children from current parent to different one.
 *
 * @param {?Tutorial} parent - New parent. If null, the tutorial has no parent.
 */
exports.Tutorial.prototype.setParent = function(parent) {
    // removes node from old parent
    if (this.parent) {
        removeChild(this.parent, this);
    }

    this.parent = parent;
    if (parent) {
        addChild(parent, this);
    }
};

/**
 * Removes children from current node.
 *
 * @param {Tutorial} child - Old child.
 */
exports.Tutorial.prototype.removeChild = function(child) {
    child.setParent(null);
};

/**
 * Adds new children to current node.
 *
 * @param {Tutorial} child - New child.
 */
exports.Tutorial.prototype.addChild = function(child) {
    child.setParent(this);
};

/**
 * Prepares source.
 *
 * @return {string} HTML source.
 */
exports.Tutorial.prototype.parse = function() {
    switch (this.type) {
        // nothing to do
        case exports.TYPES.HTML:
            return this.content;

        // markdown
        case exports.TYPES.MARKDOWN:
            var mdParse = markdown.getParser();

            return mdParse(this.content);

        // uhm... should we react somehow?
        // if not then this case can be merged with TYPES.HTML
        default:
            return this.content;
    }
};

/**
 * @class
 * @classdesc Represents the root tutorial.
 * @extends {module:jsdoc/tutorial.Tutorial}
 */
exports.RootTutorial = function() {
    exports.RootTutorial.super_.call(this, '', '');

    this._tutorials = {};
};
util.inherits(exports.RootTutorial, exports.Tutorial);

/**
 * Retrieve a tutorial by name.
 * @param {string} name - Tutorial name.
 * @return {module:jsdoc/tutorial.Tutorial} Tutorial instance.
 */
exports.RootTutorial.prototype.getByName = function(name) {
    return hasOwnProp.call(this._tutorials, name) && this._tutorials[name];
};

/**
 * Add a child tutorial to the root.
 * @param {module:jsdoc/tutorial.Tutorial} child - Child tutorial.
 */
exports.RootTutorial.prototype._addTutorial = function(child) {
    this._tutorials[child.name] = child;
};

/**
 * Tutorial source types.
 *
 * @enum {number}
 */
exports.TYPES = {
    HTML: 1,
    MARKDOWN: 2
};
