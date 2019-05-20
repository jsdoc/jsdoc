/*
    Copyright 2014-2015 Google Inc. All rights reserved.

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
const config = require('./lib/config');
let DocletHelper;
const env = require('jsdoc/env');
let finders;
const helper = require('jsdoc/util/templateHelper');
const logger = require('jsdoc/util/logger');
let PublishJob;
const semver = require('semver');
let Template;

const REQUIRED_JSDOC_VERSION = '>=3.4.3';

// Intl.PluralRules polyfill
require('intl-pluralrules');

function checkJsdocVersion() {
    const version = env.version.number;
    // strip prerelease identifiers, because, for example, '3.6.0-pre' does not satisfy '>=3.4.3'
    const strippedVersion = `${semver.major(version)}.${semver.minor(version)}.` +
        `${semver.patch(version)}`;

    if (!semver.satisfies(strippedVersion, REQUIRED_JSDOC_VERSION)) {
        logger.fatal('The Baseline template requires JSDoc %s, but you are running JSDoc %s.',
            REQUIRED_JSDOC_VERSION, version);
    }
}

function init(filepaths) {
    finders = {
        modules: require('./lib/filefinder').get('modules', filepaths)
    };

    DocletHelper = finders.modules.require('./doclethelper');
    PublishJob = finders.modules.require('./publishjob');
    Template = finders.modules.require('./template');
}

exports.publish = (data, opts, tutorials) => {
    const conf = config.loadSync().get();
    let docletHelper;
    let job;
    let template;

    checkJsdocVersion();
    // load the core modules using the file finder
    init(conf.modules);

    docletHelper = new DocletHelper();
    template = new Template(conf);
    job = new PublishJob(template, opts);

    // set up tutorials
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(data);

    job.setPackage(docletHelper.getPackage())
        .setNavTree(docletHelper.navTree)
        .setAllLongnamesTree(docletHelper.allLongnamesTree);

    // create the output directory so we can start generating files
    job.createOutputDirectory()
        // then generate the source files so we can link to them
        .generateSourceFiles(docletHelper.shortPaths);

    // generate globals page if necessary
    job.generateGlobals(docletHelper.globals);

    // generate TOC data and index page
    job.generateTocData({ hasGlobals: docletHelper.hasGlobals() })
        .generateIndex(opts.readme);

    // generate the rest of the output files (excluding tutorials)
    docletHelper.getOutputLongnames().forEach(longname => {
        job.generateByLongname(longname, docletHelper.getLongname(longname),
            docletHelper.getMemberof(longname));
    });

    // finally, generate the tutorials, and copy static files to the output directory
    job.generateTutorials(tutorials)
        .copyStaticFiles();
};
