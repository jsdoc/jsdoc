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
/* eslint-disable indent, no-process-exit */
const _ = require('lodash');
const { config, Dependencies } = require('@jsdoc/core');
const { Dictionary } = require('@jsdoc/tag');
const Engine = require('@jsdoc/cli');
const { EventBus, log } = require('@jsdoc/util');
const fs = require('fs');
const { sync: glob } = require('fast-glob');
const { Package, resolveBorrows } = require('@jsdoc/doclet');
const path = require('path');
const stripBom = require('strip-bom');
const stripJsonComments = require('strip-json-comments');
const { taffy } = require('@jsdoc/salty');

/**
 * Helper methods for running JSDoc on the command line.
 *
 * @private
 */
module.exports = (() => {
  const props = {
    docs: [],
    packageJson: null,
    shouldExitWithError: false,
    shouldPrintHelp: false,
    tmpdir: null,
  };

  const bus = new EventBus('jsdoc');
  const cli = {};
  const dependencies = new Dependencies();
  const engine = new Engine();
  const FATAL_ERROR_MESSAGE =
    'Exiting JSDoc because an error occurred. See the previous log messages for details.';
  const LOG_LEVELS = Engine.LOG_LEVELS;

  cli.setEnv = (env) => {
    dependencies.registerValue('env', env);

    return cli;
  };

  // TODO: docs
  cli.setVersionInfo = () => {
    const env = dependencies.get('env');

    const packageJsonPath = path.join(require.main.path, 'package.json');
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
  cli.loadConfig = () => {
    const env = dependencies.get('env');

    try {
      env.opts = engine.parseFlags(env.args);
    } catch (e) {
      props.shouldPrintHelp = true;
      cli.exit(1, `${e.message}\n`);

      return cli;
    }

    try {
      env.conf = config.loadSync(env.opts.configure).config;
    } catch (e) {
      cli.exit(1, `Cannot parse the config file: ${e}\n${FATAL_ERROR_MESSAGE}`);

      return cli;
    }

    // Look for options on the command line, then in the config.
    env.opts = _.defaults(env.opts, env.conf.opts);
    // Now that we're done loading and merging things, register dependencies.
    dependencies.registerValue('config', env.conf);
    dependencies.registerValue('options', env.opts);
    dependencies.registerSingletonFactory('tags', () =>
      Dictionary.fromConfig(dependencies.get('env'))
    );

    return cli;
  };

  // TODO: docs
  cli.configureLogger = () => {
    const options = dependencies.get('options');

    function recoverableError() {
      props.shouldExitWithError = true;
    }

    function fatalError() {
      cli.exit(1);
    }

    if (options.test) {
      engine.logLevel = LOG_LEVELS.SILENT;
    } else {
      if (options.debug) {
        engine.logLevel = LOG_LEVELS.DEBUG;
      } else if (options.verbose) {
        engine.logLevel = LOG_LEVELS.INFO;
      }

      if (options.pedantic) {
        bus.once('logger:warn', recoverableError);
        bus.once('logger:error', fatalError);
      } else {
        bus.once('logger:error', recoverableError);
      }

      bus.once('logger:fatal', fatalError);
    }

    return cli;
  };

  // TODO: docs
  cli.logStart = () => {
    log.debug(engine.versionDetails);
    log.debug('Environment info: %j', {
      env: {
        conf: dependencies.get('config'),
        opts: dependencies.get('options'),
      },
    });
  };

  // TODO: docs
  cli.logFinish = () => {
    let delta;
    let deltaSeconds;
    const env = dependencies.get('env');

    if (env.run.finish && env.run.start) {
      delta = env.run.finish.getTime() - env.run.start.getTime();
      deltaSeconds = (delta / 1000).toFixed(2);
      log.info(`Finished running in ${deltaSeconds} seconds.`);
    }
  };

  // TODO: docs
  cli.runCommand = () => {
    let cmd;
    const options = dependencies.get('options');

    // If we already need to exit with an error, don't do any more work.
    if (props.shouldExitWithError) {
      cmd = () => Promise.resolve(0);
    } else if (options.help) {
      cmd = cli.printHelp;
    } else if (options.test) {
      cmd = cli.runTests;
    } else if (options.version) {
      cmd = cli.printVersion;
    } else {
      cmd = cli.main;
    }

    return cmd().then((errorCode) => {
      if (!errorCode && props.shouldExitWithError) {
        errorCode = 1;
      }

      cli.logFinish();
      cli.exit(errorCode || 0);
    });
  };

  // TODO: docs
  cli.printHelp = () => {
    cli.printVersion();
    console.log(engine.help({ maxLength: process.stdout.columns }));

    return Promise.resolve(0);
  };

  // TODO: docs
  cli.runTests = async () => {
    const result = await require('./test')(dependencies);

    return result.overallStatus === 'failed' ? 1 : 0;
  };

  // TODO: docs
  cli.printVersion = () => {
    console.log(engine.versionDetails);

    return Promise.resolve(0);
  };

  // TODO: docs
  cli.main = () => {
    const env = dependencies.get('env');

    cli.scanFiles();

    if (env.sourceFiles.length === 0) {
      console.log('There are no input files to process.');

      return Promise.resolve(0);
    } else {
      return cli
        .createParser()
        .parseFiles()
        .processParseResults()
        .then(() => {
          env.run.finish = new Date();

          return 0;
        });
    }
  };

  function readPackageJson(filepath) {
    try {
      return stripJsonComments(fs.readFileSync(filepath, 'utf8'));
    } catch (e) {
      log.error(`Unable to read the package file ${filepath}`);

      return null;
    }
  }

  function buildSourceList() {
    const conf = dependencies.get('config');
    const options = dependencies.get('options');
    let packageJson;
    let sourceFiles = options._ ? options._.slice() : [];

    if (conf.sourceFiles) {
      sourceFiles = sourceFiles.concat(conf.sourceFiles);
    }

    // load the user-specified package file, if any
    if (options.package) {
      packageJson = readPackageJson(options.package);
      props.packageJson = packageJson;
    }

    // Resolve the path to the README.
    if (options.readme) {
      options.readme = path.resolve(options.readme);
    }

    return sourceFiles;
  }

  // TODO: docs
  cli.scanFiles = () => {
    const env = dependencies.get('env');
    const options = dependencies.get('options');

    options._ = buildSourceList();
    if (options._.length) {
      env.sourceFiles = glob(options._, {
        absolute: true,
        onlyFiles: true,
      });
    }

    return cli;
  };

  cli.createParser = () => {
    const { createParser, handlers } = require('@jsdoc/parse');
    const { plugins } = require('@jsdoc/core');

    const conf = dependencies.get('config');

    props.parser = createParser(dependencies);

    if (conf.plugins) {
      plugins.installPlugins(conf.plugins, props.parser, dependencies);
    }

    handlers.attachTo(props.parser);

    return cli;
  };

  cli.parseFiles = () => {
    const { augmentAll } = require('@jsdoc/doclet').augment;

    let docs;
    const env = dependencies.get('env');
    const options = dependencies.get('options');
    let packageDocs;

    props.docs = docs = props.parser.parse(env.sourceFiles, options.encoding);

    // If there is no package.json, just create an empty package
    packageDocs = new Package(props.packageJson);
    packageDocs.files = env.sourceFiles || [];
    docs.push(packageDocs);

    log.debug('Adding inherited symbols, mixins, and interface implementations...');
    augmentAll(docs);
    log.debug('Adding borrowed doclets...');
    resolveBorrows(docs);
    log.debug('Post-processing complete.');

    props.parser.fireProcessingComplete(docs);

    return cli;
  };

  cli.processParseResults = () => {
    const options = dependencies.get('options');

    if (options.explain) {
      cli.dumpParseResults();

      return Promise.resolve();
    } else {
      return cli.generateDocs();
    }
  };

  cli.dumpParseResults = () => {
    console.log(JSON.stringify(props.docs, null, 4));

    return cli;
  };

  cli.generateDocs = () => {
    let message;
    const options = dependencies.get('options');
    let template;

    options.template = options.template || path.join(__dirname, 'templates', 'default');

    try {
      // TODO: Just look for a `publish` function in the specified module, not a `publish.js`
      // file _and_ a `publish` function.
      template = require(`${options.template}/publish`);
    } catch (e) {
      log.fatal(`Unable to load template: ${e.message}` || e);
    }

    // templates should include a publish.js file that exports a "publish" function
    if (template.publish && typeof template.publish === 'function') {
      let publishPromise;

      log.info('Generating output files...');
      publishPromise = template.publish(taffy(props.docs), dependencies);

      return Promise.resolve(publishPromise);
    } else {
      message =
        `${options.template} does not export a "publish" function. ` +
        'Global "publish" functions are no longer supported.';
      log.fatal(message);

      return Promise.reject(new Error(message));
    }
  };

  // TODO: docs
  cli.exit = (exitCode, message) => {
    if (exitCode > 0) {
      props.shouldExitWithError = true;

      if (message) {
        console.error(message);
      }
    }

    process.on('exit', () => {
      if (props.shouldPrintHelp) {
        cli.printHelp();
      }

      process.exit(exitCode);
    });
  };

  return cli;
})();
