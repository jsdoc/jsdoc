/*global env: true */
/**
    @overview
    @author Rafa&#322; Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
    @module jsdoc/tutorial/resolver
 */

var tutorial = require('jsdoc/tutorial'),
    fs = require('jsdoc/fs'),
    path = require('path'),
    hasOwnProp = Object.prototype.hasOwnProperty,
    conf = {},
    tutorials = {},
    finder = /^(.*)\.(x(?:ht)?ml|html?|md|markdown|json)$/i;

/** Adds new tutorial.
    @param {tutorial.Tutorial} current - New tutorial.
 */
exports.addTutorial = function(current) {
    tutorials[current.name] = current;

    // default temporary parent
    current.setParent(exports.root);
};

/** Root tutorial.
    @type tutorial.Tutorial
 */
exports.root = new tutorial.Tutorial('', '');

/** Additional instance method for root node.
    @param {string} name - Tutorial name.
    @return {tutorial.Tutorial} Tutorial instance.
 */
exports.root.getByName = function(name) {
    return tutorials[name];
};

/** Load tutorials from given path.
    @param {string} _path - Tutorials directory.
 */
exports.load = function(_path) {
    var match,
        type,
        name,
        content,
        current,
        files = fs.ls(_path);

    // tutorials handling
    files.forEach(function(file) {
        match = file.match(finder);

        // any filetype that can apply to tutorials
        if (match) {
            name = path.basename(match[1]);
            content = fs.readFileSync(file, env.opts.encoding);

            switch (match[2].toLowerCase()) {
                // HTML type
                case 'xml':
                case 'xhtml':
                case 'html':
                case 'htm':
                    type = tutorial.TYPES.HTML;
                    break;

                // Markdown typs
                case 'md':
                case 'markdown':
                    type = tutorial.TYPES.MARKDOWN;
                    break;

                // configuration file
                case 'json':
                    conf[name] = JSON.parse(content);
                    // don't add this as a tutorial
                    return;

                // how can it be? check `finder' regexp
                default:
                    // not a file we want to work with
                    return;
            }

            current = new tutorial.Tutorial(name, content, type);
            exports.addTutorial(current);
        }
    });
};

/** Resolves hierarchical structure.
 */
exports.resolve = function() {
    var item,
        current;
    for (var name in conf) {
        if ( hasOwnProp.call(conf, name) ) {
            // TODO: should we complain about this?
            if (!(name in tutorials)) {
                continue;
            }

            item = conf[name];
            current = tutorials[name];

            // set title
            if (item.title) {
                current.title = item.title;
            }

            // add children
            if (item.children) {
                item.children.forEach(function(child) {
                    if (!(child in tutorials)) {
                        require('jsdoc/util/error').handle( new Error("Missing child tutorial: " + child) );
                    }
                    else {
                        tutorials[child].setParent(current);
                    }
                });
            }
        }
    }
};
