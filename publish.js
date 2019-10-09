/*
    Copyright 2014-2019 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
const _ = require('lodash');
const config = require('./lib/config');
const defaultTasks = require('./lib/default-tasks');
const DocletHelper = require('./lib/doclethelper');
const helper = require('jsdoc/util/templateHelper');
const PublishJob = require('./lib/publishjob');
const { TaskRunner } = require('@jsdoc/task-runner');
const Template = require('./lib/template');

exports.publish = async (data, opts, tutorials) => {
    const templateConfig = config.loadSync().get();
    const allConfig = _.defaults({}, {
        templates: {
            baseline: templateConfig
        }
    }, opts);
    const context = {};
    const docletHelper = new DocletHelper();
    const template = new Template(templateConfig);
    const job = new PublishJob(template, opts);
    const runner = new TaskRunner({
        config: allConfig,
        templateConfig
    });
    const tasks = defaultTasks(allConfig);

    // set up tutorials
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(data);

    job.setPackage(docletHelper.getPackage());
    // TODO: Create a task that sets the package and page title prefix.
    context.package = docletHelper.getPackage();
    context.pageTitlePrefix = docletHelper.pageTitlePrefix;

    job.setNavTree(docletHelper.navTree);
    // TODO: Create a task that sets the nav tree.
    context.navTree = docletHelper.navTree;

    // TODO: Get rid of `allLongnamesTree`.
    job.setAllLongnamesTree(docletHelper.allLongnamesTree);
    context.allLongnamesTree = docletHelper.allLongnamesTree;

    // TODO: Create a task that extracts and sets the short paths.
    context.shortPaths = docletHelper.shortPaths;

    runner.addTasks(tasks);
    try {
        await runner.run(context);
    } catch (e) {
        // TODO: Send to message bus
        throw e;
    }

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
    job.generateTutorials(tutorials);

    return Promise.resolve();
};
