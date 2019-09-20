/**
 * @module jsdoc/tutorial
 */
const markdown = require('jsdoc/util/markdown');

const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Removes child tutorial from the parent. Does *not* unset child.parent though.
 *
 * @param {Tutorial} parent - parent tutorial.
 * @param {Tutorial} child - Old child.
 * @private
 */
function removeChild({children}, child) {
    const index = children.indexOf(child);

    if (index !== -1) {
        children.splice(index, 1);
    }
}

/**
 * Adds a child to the parent tutorial. Does *not* set child.parent though.
 *
 * @param {Tutorial} parent - parent tutorial.
 * @param {Tutorial} child - New child.
 * @private
 */
function addChild({children}, child) {
    children.push(child);
}

/**
 * Represents a single JSDoc tutorial.
 */
class Tutorial {
    /**
     * @param {string} name - Tutorial name.
     * @param {string} content - Text content.
     * @param {number} type - Source formating.

     */
    constructor(name, content, type) {
        this.title = this.name = this.longname = name;
        this.content = content;
        this.type = type;

        // default values
        this.parent = null;
        this.children = [];
    }

    /**
     * Moves children from current parent to different one.
     *
     * @param {?Tutorial} parent - New parent. If null, the tutorial has no parent.
     */
    setParent(parent) {
        // removes node from old parent
        if (this.parent) {
            removeChild(this.parent, this);
        }

        this.parent = parent;
        if (parent) {
            addChild(parent, this);
        }
    }

    /* eslint-disable class-methods-use-this */
    /**
     * Removes children from current node.
     *
     * @param {Tutorial} child - Old child.
     */
    removeChild(child) {
        child.setParent(null);
    }
    /* eslint-enable class-methods-use-this */

    /**
     * Adds new children to current node.
     *
     * @param {Tutorial} child - New child.
     */
    addChild(child) {
        child.setParent(this);
    }

    /**
     * Prepares source.
     *
     * @return {string} HTML source.
     */
    parse() {
        switch (this.type) {
            // nothing to do
            case exports.TYPES.HTML:
                return this.content;

            // markdown
            case exports.TYPES.MARKDOWN:
                return markdown.getParser()(this.content);

            // uhm... should we react somehow?
            // if not then this case can be merged with TYPES.HTML
            default:
                return this.content;
        }
    }
}
exports.Tutorial = Tutorial;

/**
 * Represents the root tutorial.
 * @extends {module:jsdoc/tutorial.Tutorial}
 */
class RootTutorial extends Tutorial {
    constructor() {
        super('', '', null);

        this._tutorials = {};
    }

    /**
     * Retrieve a tutorial by name.
     * @param {string} name - Tutorial name.
     * @return {module:jsdoc/tutorial.Tutorial} Tutorial instance.
     */
    getByName(name) {
        return hasOwnProp.call(this._tutorials, name) && this._tutorials[name];
    }

    /**
     * Add a child tutorial to the root.
     * @param {module:jsdoc/tutorial.Tutorial} child - Child tutorial.
     */
    _addTutorial(child) {
        this._tutorials[child.name] = child;
    }
}
exports.RootTutorial = RootTutorial;

/**
 * Tutorial source types.
 *
 * @enum {number}
 */
exports.TYPES = {
    HTML: 1,
    MARKDOWN: 2
};
