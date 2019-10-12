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
const db = require('./lib/db');
const defaultTasks = require('./lib/default-tasks');
const DocletHelper = require('./lib/doclethelper');
const env = require('jsdoc/env');
const helper = require('jsdoc/util/templateHelper');
const PublishJob = require('./lib/publishjob');
const { TaskRunner } = require('@jsdoc/task-runner');
const Template = require('./lib/template');

exports.publish = async (taffyData, options, tutorials) => {
    const templateConfig = config.loadSync().get();
    const allConfig = _.defaults({}, {
        templates: {
            baseline: templateConfig
        }
    }, options, { opts: env.opts });
    const context = {
        config: allConfig,
        templateConfig
    };
    const docletHelper = new DocletHelper();
    const template = new Template(templateConfig);
    const job = new PublishJob(template, options);
    const runner = new TaskRunner(context);
    const tasks = defaultTasks(allConfig);
    let indexUrl;

    // Claim some special filenames in advance.
    // TODO: Do this in a task. Remove duplicated logic in tests.
    indexUrl = job.indexUrl = helper.getUniqueFilename('index');
    helper.registerLink('index', indexUrl);
    helper.registerLink('global', helper.getUniqueFilename('global'));

    // set up tutorials
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(taffyData);
    // TODO: Replicate this logic when `DocletHelper` goes away:
    // helper.prune(taffyData);
    // taffyData.sort('longname, version, since');
    context.doclets = db({
        config: allConfig,
        values: docletHelper.allDoclets
    });
    // TODO: Create a task that sets up context.
    context.sourceFiles = docletHelper.shortPaths;

    job.setPackage(docletHelper.getPackage());
    // TODO: Create a task that sets up context.
    context.package = docletHelper.getPackage();
    context.pageTitlePrefix = docletHelper.pageTitlePrefix;

    // TODO: Get rid of `allLongnamesTree`.
    job.setAllLongnamesTree(docletHelper.allLongnamesTree);
    context.allLongnamesTree = docletHelper.allLongnamesTree;

    runner.addTasks(tasks);
    try {
        await runner.run();
    } catch (e) {
        // TODO: Send to message bus
        throw e;
    }

    // generate index page
    job.generateIndex(options.readme);

    // generate the rest of the output files (excluding tutorials)
    docletHelper.getOutputLongnames().forEach(longname => {
        job.generateByLongname(longname, docletHelper.getLongname(longname),
            docletHelper.getMemberof(longname));
    });

    // finally, generate the tutorials
    job.generateTutorials(tutorials);

    return Promise.resolve();
};
