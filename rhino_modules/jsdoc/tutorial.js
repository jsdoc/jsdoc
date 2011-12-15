/**
    @overview
    @author Rafał Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/tutorial
 */

/**
    @class
    @classdesc Represents a single JSDoc tutorial.
    @param {string} name - Tutorial name.
    @param {string} content - Text content.
 */
exports.Tutorial = function(name, content) {
    this.title = this.name = name;
    this.content = content;

    // default values
    this.parent = null;
    this.children = [];
    this.type = exports.Tutorial.HTML;
};

/** Tutorial source types.
    @enum {string}
 */
exports.Tutorial.TYPES = {
    HTML: "html",
    MD: "markdown"
};

/** Moves children from current parent to different one.
    @param {Tutorial} parent
 */
exports.Tutorial.prototype.setParent = function(parent) {
    // removes node from old parent
    if (this.parent) {
        this.parent.removeChild(this);
    }

    this.parent = parent;
    this.parent.addChild(this);
};

/** Removes children from current node.
    @param {Tutorial} child
 */
exports.Tutorial.prototype.removeChild = function(child) {
    var index = this.children.indexOf(child);
    if (index != -1) {
        this.children.splice(index, 1);
    }
};

/** Adds new children to current node.
    @param {Tutorial} child
 */
exports.Tutorial.prototype.addChild = function(child) {
    this.children.push(child);
};
