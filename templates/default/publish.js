/*global env: true */
'use strict';

var View = require('jsdoc/util/view');

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {

    var conf = env.conf.templates || {};
    var viewManager = new View(taffyData, tutorials, opts, conf.default || {});

    // generate the pretty-printed source files first so other pages can link to them
    viewManager.generateSourceFiles();

    viewManager.generateGlobalPage('Global');

    viewManager.generateMainPage('Home');

    viewManager.generatePages('Home');

    viewManager.generateTutorials();
};
