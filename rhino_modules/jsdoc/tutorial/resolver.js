/**
    @overview
    @author Rafał Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/tutorial/resolver
 */

var tutorial = require('jsdoc/tutorial');

var tutorials = {},
    length = 0;

/** Adds new tutorial.
    @param {tutorial.Tutorial} tutorial - New tutorial.
 */
exports.addTutorial = function(tutorial) {
    tutorials[tutorial.name] = tutorial;
    ++length;

    // default temporary parent
    tutorial.setParent(exports.root);
};

/** Root tutorial.
    @type tutorial.Tutorial
 */
exports.root = new tutorial.Tutorial('', '');

/** Resolves hierarchical structure.
    @param {object} map - Contents map.
 */
exports.resolve = function(map) {
    //TODO
};
