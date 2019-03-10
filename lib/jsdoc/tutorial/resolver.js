/**
 * @module jsdoc/tutorial/resolver
 */
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const logger = require('jsdoc/util/logger');
const path = require('path');
const stripBom = require('jsdoc/util/stripbom');
const tutorial = require('jsdoc/tutorial');

const hasOwnProp = Object.prototype.hasOwnProperty;

// TODO: make this an instance member of `RootTutorial`?
const conf = {};
const finder = /^(.*)\.(x(?:ht)?ml|html?|md|markdown|json)$/i;

/** checks if `conf` is the metadata for a single tutorial.
 * A tutorial's metadata has a property 'title' and/or a property 'children'.
 * @param {object} json - the object we want to test (typically from JSON.parse)
 * @returns {boolean} whether `json` could be the metadata for a tutorial.
 */
function isTutorialJSON(json) {
    // if conf.title exists or conf.children exists, it is metadata for a tutorial
    return (hasOwnProp.call(json, 'title') || hasOwnProp.call(json, 'children'));
}

/**
 * Root tutorial.
 * @type {module:jsdoc/tutorial.Root}
 */
exports.root = new tutorial.RootTutorial();

/**
 * Helper function that adds tutorial configuration to the `conf` variable. This helps when multiple
 * tutorial configurations are specified in one object, or when a tutorial's children are specified
 * as tutorial configurations as opposed to an array of tutorial names.
 *
 * Recurses as necessary to ensure all tutorials are added.
 *
 * @param {string} name - if `meta` is a configuration for a single tutorial, this is that
 * tutorial's name.
 * @param {object} meta - object that contains tutorial information. Can either be for a single
 * tutorial, or for multiple (where each key in `meta` is the tutorial name and each value is the
 * information for a single tutorial). Additionally, a tutorial's 'children' property may either be
 * an array of strings (names of the child tutorials), OR an object giving the configuration for the
 * child tutorials.
 */
function addTutorialConf(name, meta) {
    let names;

    if (isTutorialJSON(meta)) {
        // if the children are themselves tutorial defintions as opposed to an
        // array of strings, add each child.
        if (hasOwnProp.call(meta, 'children') && !Array.isArray(meta.children)) {
            names = Object.keys(meta.children);
            for (let childName of names) {
                addTutorialConf(childName, meta.children[childName]);
            }
            // replace with an array of names.
            meta.children = names;
        }
        // check if the tutorial has already been defined...
        if (hasOwnProp.call(conf, name)) {
            logger.warn(`Metadata for the tutorial ${name} is defined more than once. Only the first definition will be used.`);
        } else {
            conf[name] = meta;
        }
    } else {
        // keys are tutorial names, values are `Tutorial` instances
        names = Object.keys(meta);
        for (let tutorialName of names) {
            addTutorialConf(tutorialName, meta[tutorialName]);
        }
    }
}

/**
 * Add a tutorial.
 * @param {module:jsdoc/tutorial.Tutorial} current - Tutorial to add.
 */
exports.addTutorial = current => {
    if (exports.root.getByName(current.name)) {
        logger.warn('The tutorial %s is defined more than once. Only the first definition will be used.', current.name);
    } else {
        // by default, the root tutorial is the parent
        current.setParent(exports.root);

        exports.root._addTutorial(current);
    }
};

/**
 * Load tutorials from the given path.
 * @param {string} filepath - Tutorials directory.
 */
exports.load = filepath => {
    let content;
    let current;
    const files = fs.ls(filepath, env.opts.recurse ? env.conf.recurseDepth : undefined);
    let name;
    let match;
    let type;

    // tutorials handling
    files.forEach(file => {
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
                    addTutorialConf(name, JSON.parse(stripBom.strip(content)));

                    // don't add this as a tutorial
                    return;

                // how can it be? check `finder' regexp
                // not a file we want to work with
                default:
                    return;
            }

            current = new tutorial.Tutorial(name, content, type);
            exports.addTutorial(current);
        }
    });
};

/**
 * Resolves hierarchical structure.
 */
exports.resolve = () => {
    let item;
    let current;

    Object.keys(conf).forEach(name => {
        current = exports.root.getByName(name);

        // TODO: should we complain about this?
        if (!current) {
            return;
        }

        item = conf[name];

        // set title
        if (item.title) {
            current.title = item.title;
        }

        // add children
        if (item.children) {
            item.children.forEach(child => {
                const childTutorial = exports.root.getByName(child);

                if (!childTutorial) {
                    logger.error('Missing child tutorial: %s', child);
                }
                else {
                    childTutorial.setParent(current);
                }
            });
        }
    });
};
