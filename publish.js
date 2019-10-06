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
let DocletHelper;
let finders;
const helper = require('jsdoc/util/templateHelper');
let PublishJob;
const { TaskRunner } = require('@jsdoc/task-runner');
let Template;

function init(filepaths) {
    finders = {
        modules: require('./lib/filefinder').get('modules', filepaths)
    };

    DocletHelper = finders.modules.require('./doclethelper');
    PublishJob = finders.modules.require('./publishjob');
    Template = finders.modules.require('./template');
}

exports.publish = async (data, opts, tutorials) => {
    const templateConfig = config.loadSync().get();
    const allConfig = _.defaults({}, {
        templates: {
            baseline: templateConfig
        }
    }, opts);
    let docletHelper;
    let job;
    const runner = new TaskRunner({
        config: allConfig,
        templateConfig
    });
    const tasks = defaultTasks(allConfig);
    let template;

    // load the core modules using the file finder
    init(templateConfig.modules);

    docletHelper = new DocletHelper();
    template = new Template(templateConfig);
    job = new PublishJob(template, opts);

    // set up tutorials
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(data);

    job.setPackage(docletHelper.getPackage())
        .setNavTree(docletHelper.navTree)
        .setAllLongnamesTree(docletHelper.allLongnamesTree);

    runner.addTasks(tasks);
    try {
        await runner.run();
    } catch (e) {
        // TODO: Send to message bus
        throw e;
    }

    job.generateSourceFiles(docletHelper.shortPaths);

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
