/*
  Copyright 2011 the JSDoc Authors.

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

/* eslint-disable no-process-exit */
import fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import Engine from '@jsdoc/cli';
import { config as jsdocConfig, plugins } from '@jsdoc/core';
import { augment, Package, resolveBorrows } from '@jsdoc/doclet';
import { createParser, handlers } from '@jsdoc/parse';
import { Dictionary } from '@jsdoc/tag';
import _ from 'lodash';
import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';

import test from './test/index.js';

/**
 * Helper methods for running JSDoc on the command line.
 *
 * @private
 */
export default (() => {
  const props = {
    docs: [],
    packageJson: null,
    shouldExitWithError: false,
    shouldPrintHelp: false,
    tmpdir: null,
  };

  const cli = {};
  const engine = new Engine();
  const { api, env, log } = engine;
  const FATAL_ERROR_MESSAGE =
    'Exiting JSDoc because an error occurred. See the previous log messages for details.';

  // TODO: docs
  cli.setVersionInfo = () => {
    const packageJsonPath = fileURLToPath(new URL('package.json', import.meta.url));
    // allow this to throw--something is really wrong if we can't read our own package file
    const info = JSON.parse(stripBom(fs.readFileSync(packageJsonPath, 'utf8')));
    const revision = new Date(parseInt(info.revision, 10));

    env.version = {
      number: info.version,
      revision: revision.toUTCString(),
    };

    engine.version = env.version.number;
    engine.revision = revision;

    return cli;
  };

  // TODO: docs
  cli.loadConfig = async () => {
    try {
      env.opts = engine.parseFlags(env.args);
    } catch (e) {
      engine.shouldPrintHelp = true;
      engine.exit(1, `${e.message}\n`);

      return cli;
    }

    try {
      // eslint-disable-next-line require-atomic-updates
      env.conf = (await jsdocConfig.load(env.opts.configure)).config;
    } catch (e) {
      engine.exit(1, `Cannot parse the config file: ${e}\n${FATAL_ERROR_MESSAGE}`);

      return cli;
    }

    // Look for options on the command line, then in the config.
    env.opts = _.defaults(env.opts, env.conf.opts);
    env.tags = Dictionary.fromConfig(env);

    return cli;
  };

  // TODO: docs
  cli.configureLogger = () => {
    engine.configureLogger();

    return cli;
  };

  // TODO: docs
  cli.logStart = () => {
    log.debug(engine.versionDetails);
    log.debug('Environment info: %j', {
      env: {
        conf: env.config,
        opts: env.options,
      },
    });
  };

  // TODO: docs
  cli.logFinish = () => {
    let delta;
    let deltaSeconds;

    if (env.run.finish && env.run.start) {
      delta = env.run.finish.getTime() - env.run.start.getTime();
      deltaSeconds = (delta / 1000).toFixed(2);
      log.info(`Finished running in ${deltaSeconds} seconds.`);
    }
  };

  // TODO: docs
  cli.runCommand = () => {
    let cmd;
    const { options } = env;

    // If we already need to exit with an error, don't do any more work.
    if (engine.shouldExitWithError) {
      cmd = () => Promise.resolve(0);
    } else if (options.help) {
      cmd = () => engine.printHelp();
    } else if (options.test) {
      cmd = cli.runTests;
    } else if (options.version) {
      cmd = () => engine.printVersion();
    } else {
      cmd = cli.main;
    }

    return cmd().then((errorCode) => {
      if (!errorCode && engine.shouldExitWithError) {
        errorCode = 1;
      }

      cli.logFinish();
      engine.exit(errorCode || 0);
    });
  };

  // TODO: docs
  cli.runTests = async () => {
    const result = await test(env);

    return result.overallStatus === 'failed' ? 1 : 0;
  };

  // TODO: docs
  cli.main = async () => {
    await api.findSourceFiles();

    if (env.sourceFiles.length === 0) {
      console.log('There are no input files to process.');

      return Promise.resolve(0);
    } else {
      await cli.createParser();
      await cli.parseFiles();

      return cli.processParseResults().then(() => {
        env.run.finish = new Date();

        return 0;
      });
    }
  };

  async function readPackageJson(filepath) {
    let data;

    try {
      data = await readFile(filepath, 'utf8');

      return stripJsonComments(data);
    } catch (e) {
      log.error(`Unable to read the package file ${filepath}`);

      return null;
    }
  }

  cli.createParser = async () => {
    const { config } = env;

    props.parser = createParser(env);

    if (config.plugins) {
      await plugins.installPlugins(config.plugins, props.parser, env);
    }

    handlers.attachTo(props.parser);

    return cli;
  };

  cli.parseFiles = async () => {
    const { options } = env;
    let packageData = '';
    let packageDocs;
    let docletStore;

    docletStore = props.docs = props.parser.parse(env.sourceFiles, options.encoding);

    if (props.packageJson) {
      packageData = await readPackageJson(props.packageJson);
    }
    packageDocs = new Package(packageData, env);
    packageDocs.files = env.sourceFiles || [];
    docletStore.add(packageDocs);

    log.debug('Adding inherited symbols, mixins, and interface implementations...');
    augment.augmentAll(docletStore);
    log.debug('Adding borrowed doclets...');
    resolveBorrows(docletStore);
    log.debug('Post-processing complete.');
    if (props.parser.listenerCount('processingComplete')) {
      props.parser.fireProcessingComplete(Array.from(docletStore.doclets));
    }

    return cli;
  };

  cli.processParseResults = () => {
    if (env.options.explain) {
      cli.dumpParseResults();

      return Promise.resolve();
    } else {
      return cli.generateDocs();
    }
  };

  cli.dumpParseResults = () => {
    let doclets;
    const { options } = env;

    if (options.debug || options.verbose) {
      doclets = props.docs.allDoclets;
    } else {
      doclets = props.docs.doclets;
    }

    console.log(JSON.stringify(Array.from(doclets), null, 2));

    return cli;
  };

  cli.generateDocs = async () => {
    let message;
    const { options } = env;
    let template;

    options.template ??= '@jsdoc/template-legacy';

    try {
      template = await import(options.template);
    } catch (e) {
      log.fatal(`Unable to load template: ${e.message ?? e}`);
    }

    // templates should export a "publish" function
    if (template.publish && typeof template.publish === 'function') {
      let publishPromise;

      log.info('Generating output files...');
      publishPromise = template.publish(props.docs, env);

      return Promise.resolve(publishPromise);
    } else {
      message =
        `${options.template} does not export a "publish" function. ` +
        'Global "publish" functions are no longer supported.';
      log.fatal(message);

      return Promise.reject(new Error(message));
    }
  };

  return cli;
})();
