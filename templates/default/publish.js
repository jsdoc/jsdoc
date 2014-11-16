/*global env: true */
/*eslint no-new:0 */
'use strict';

var TemplateRenderer = require('jsdoc/util/templateRenderer');

var _ = require('underscore');
var helper = require('jsdoc/util/templateHelper');
var path = require('jsdoc/path');
var fs = require('jsdoc/fs');
var template = require('jsdoc/template');
var docletHelper = require('jsdoc/util/docletHelper');
var logger = require('jsdoc/util/logger');
var doop = require('jsdoc/util/doop');
var util = require('util');

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    new TemplateRenderer(taffyData, tutorials, opts);
};
