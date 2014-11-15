/*global env: true */
/*eslint no-new:0 */
'use strict';

var TemplateRenderer = require('jsdoc/util/view');

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    var conf = env.conf.templates || {};
    new TemplateRenderer(taffyData, tutorials, opts, conf.default || {});
};
