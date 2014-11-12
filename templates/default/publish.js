/*global env: true */
'use strict';

var doop = require('jsdoc/util/doop');
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');
var docletHelper = require('jsdoc/util/docletHelper');
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');
var _ = require('underscore'); // should replace it with lodash
var util = require('util');

var linkto = helper.linkto;
var hasOwnProp = Object.prototype.hasOwnProperty;

var View = require('jsdoc/util/view');

var data;
var view;

function find(spec) {
    return helper.find(data, spec);
}

function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
}

function getAncestorLinks(doclet) {
    return helper.getAncestorLinks(data, doclet);
}


/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
    var symbols = {};

    // build a lookup table
    doclets.forEach(function(symbol) {
        symbols[symbol.longname] = symbols[symbol.longname] || [];
        symbols[symbol.longname].push(symbol);
    });

    return modules.map(function(module) {
        if (symbols[module.longname]) {
            module.modules = symbols[module.longname].map(function(symbol) {
                symbol = doop(symbol);

                if (symbol.kind === 'class' || symbol.kind === 'function') {
                    symbol.name = symbol.name.replace('module:', '(require("') + '"))';
                }

                return symbol;
            });
        }
    });
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @param {array<object>} members.interfaces
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {
    var nav = '<h2><a href="index.html">Home</a></h2>',
        seen = {},
        hasClassList = false,
        classNav = '',
        globalNav = '';

    if (members.modules.length) {
        nav += '<h3>Modules</h3><ul>';
        members.modules.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>' + linkto(m.longname, m.name) + '</li>';
            }
            seen[m.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.externals.length) {
        nav += '<h3>Externals</h3><ul>';
        members.externals.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>' + linkto( e.longname, e.name.replace(/(^"|"$)/g, '') ) + '</li>';
            }
            seen[e.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.classes.length) {
        members.classes.forEach(function(c) {
            if ( !hasOwnProp.call(seen, c.longname) ) {
                classNav += '<li>' + linkto(c.longname, c.name) + '</li>';
            }
            seen[c.longname] = true;
        });

        if (classNav !== '') {
            nav += '<h3>Classes</h3><ul>';
            nav += classNav;
            nav += '</ul>';
        }
    }

    if (members.events.length) {
        nav += '<h3>Events</h3><ul>';
        members.events.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>' + linkto(e.longname, e.name) + '</li>';
            }
            seen[e.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.namespaces.length) {
        nav += '<h3>Namespaces</h3><ul>';
        members.namespaces.forEach(function(n) {
            if ( !hasOwnProp.call(seen, n.longname) ) {
                nav += '<li>' + linkto(n.longname, n.name) + '</li>';
            }
            seen[n.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.mixins.length) {
        nav += '<h3>Mixins</h3><ul>';
        members.mixins.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>' + linkto(m.longname, m.name) + '</li>';
            }
            seen[m.longname] = true;
        });

        nav += '</ul>';
    }

    if (members.tutorials.length) {
        nav += '<h3>Tutorials</h3><ul>';
        members.tutorials.forEach(function(t) {
            nav += '<li>' + tutoriallink(t.name) + '</li>';
        });

        nav += '</ul>';
    }

    if (members.interfaces.length) {
        nav += '<h3>Interfaces</h3><ul>';
        members.interfaces.forEach(function(i) {
            nav += '<li>' + linkto(i.longname, i.name) + '</li>';
        });
        nav += '</ul>';
    }

    if (members.globals.length) {
        members.globals.forEach(function(g) {
            if ( g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname) ) {
                globalNav += '<li>' + linkto(g.longname, g.name) + '</li>';
            }
            seen[g.longname] = true;
        });

        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += '<h3>' + linkto('global', 'Global') + '</h3>';
        }
        else {
            nav += '<h3>Global</h3><ul>' + globalNav + '</ul>';
        }
    }

    return nav;
}

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {

    var conf = env.conf.templates || {};
    var viewManager = new View(taffyData, opts, conf.default || {});
    view = viewManager.view;

    // set up tutorials for helper
    helper.setTutorials(tutorials);

    data = viewManager.data;

    data().each(function(doclet) {
        doclet.attribs = '';

        if (doclet.examples) {
            doclet.examples = doclet.examples.map(function(example) {
                var caption, code;

                if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
                    caption = RegExp.$1;
                    code = RegExp.$3;
                }

                return {
                    caption: caption || '',
                    code: code || example
                };
            });
        }
        if (doclet.see) {
            doclet.see.forEach(function(seeItem, i) {
                doclet.see[i] = docletHelper.hashToLink(doclet, seeItem);
            });
        }
    });

    viewManager.processSourceFilesStepOne();

    data().each(function(doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);
    });

    viewManager.processSourceFilesStepTwo();

    data().each(function(doclet) {
        var url = helper.longnameToUrl[doclet.longname];

        if (url.indexOf('#') > -1) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }

        if ( docletHelper.needsSignature(doclet) ) {
            docletHelper.addSignatureParams(doclet);
            docletHelper.addSignatureReturns(doclet);
            docletHelper.addAttribs(doclet);
        }
    });

    // do this after the urls have all been generated
    data().each(function(doclet) {
        doclet.ancestors = getAncestorLinks(doclet);

        if (doclet.kind === 'member') {
            docletHelper.addSignatureTypes(doclet);
            docletHelper.addAttribs(doclet);
        }

        if (doclet.kind === 'constant') {
            docletHelper.addSignatureTypes(doclet);
            docletHelper.addAttribs(doclet);
            doclet.kind = 'member';
        }
    });

    var members = helper.getMembers(data);
    members.tutorials = tutorials.children;

    // add template helpers
    view.find = find;
    view.tutoriallink = tutoriallink;

    // once for all
    view.nav = buildNav(members);
    attachModuleSymbols( find({ longname: {left: 'module:'} }), members.modules );

    // generate the pretty-printed source files first so other pages can link to them
    viewManager.generateSourceFiles();

    if (members.globals.length) {
        viewManager.generateGlobalPage('Global');
    }

    viewManager.generateMainPage('Home');

    Object.keys(helper.longnameToUrl).forEach(function(longname) {
        var myClasses = _.where(members.classes, {longname: longname});
        if (myClasses.length) {
            viewManager.generate('Class: ' + myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
        }

        var myModules = _.where(members.modules, {longname: longname});
        if (myModules.length) {
            viewManager.generate('Module: ' + myModules[0].name, myModules, helper.longnameToUrl[longname]);
        }

        var myNamespaces = _.where(members.namespaces, {longname: longname});
        if (myNamespaces.length) {
            viewManager.generate('Namespace: ' + myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
        }

        var myMixins = _.where(members.mixins, {longname: longname});
        if (myMixins.length) {
            viewManager.generate('Mixin: ' + myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
        }

        var myExternals = _.where(members.externals, {longname: longname});
        if (myExternals.length) {
            viewManager.generate('External: ' + myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
        }

        var myInterfaces = _.where(members.interfaces, {longname: longname});
        if (myInterfaces.length) {
            viewManager.generate('Interface: ' + myInterfaces[0].name, myInterfaces, helper.longnameToUrl[longname]);
        }
    });


    // tutorials can have only one parent so there is no risk for loops
    function saveChildren(node) {
        node.children.forEach(function(child) {
            viewManager.generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
            saveChildren(child);
        });
    }
    saveChildren(tutorials);
};
