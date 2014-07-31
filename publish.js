/*
    Copyright 2014 Google Inc. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
'use strict';

var DocletHelper = require('./lib/doclethelper');
var helper = require('jsdoc/util/templateHelper');
var PublishJob = require('./lib/publishjob');
var Template = require('./lib/template');

var CATEGORIES = require('./lib/enums').CATEGORIES;

/**
    @param {TAFFY} data See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(data, opts, tutorials) {
    var docletHelper = new DocletHelper();
    var template = new Template(opts.template, global.env.conf.templates.baseline);
    var job = new PublishJob(template, opts);

    // set up tutorials
    // TODO: why does templateHelper need to be involved?
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(data);

    job.setPackage(docletHelper.getPackage());

    // create the output directory so we can start generating files
    job.createOutputDirectory()
        // then generate the source files so we can link to them
        .generateSourceFiles(docletHelper.shortPaths);

    // generate globals page if necessary
    job.generateGlobals(docletHelper.globals);

    // generate index page
    // TODO: method params will need to change
    job.generateIndex(docletHelper.symbols.get(CATEGORIES.PACKAGES), opts.readme);

    // generate the rest of the output files (excluding tutorials)
    docletHelper.getOutputLongnames().forEach(function(longname) {
        job.generateByLongname(longname, docletHelper.longname[longname],
            docletHelper.memberof[longname]);
    });

    // finally, generate the TOC data and tutorials, and copy static files to the output directory
    job.generateTutorials(tutorials)
        .generateTocData(docletHelper.navTree, { hasGlobals: docletHelper.hasGlobals() })
        .copyStaticFiles();
};
