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
const { db } = require('./lib/db');
const DocletHelper = require('./lib/doclethelper');
const env = require('jsdoc/env');
const helper = require('jsdoc/util/templateHelper');
const { TaskRunner } = require('@jsdoc/task-runner');
const tasks = require('./lib/default-tasks');

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
    const runner = new TaskRunner(context);

    // set up tutorials
    helper.setTutorials(tutorials);

    docletHelper.addDoclets(taffyData);
    // TODO: Replicate this logic when `DocletHelper` goes away:
    // helper.prune(taffyData);
    // taffyData.sort('longname, version, since');
    // TODO: Do all of this in the `setContext` task.
    context.doclets = db({
        config: allConfig,
        values: docletHelper.allDoclets
    });
    context.sourceFiles = docletHelper.shortPaths;
    context.package = docletHelper.getPackage();
    context.allLongnamesTree = docletHelper.allLongnamesTree;

    runner.addTasks(tasks);
    try {
        await runner.run();
    } catch (e) {
        // TODO: Send to message bus
        return Promise.reject(e);
    }

    return Promise.resolve();
};
