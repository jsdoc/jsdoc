/* eslint-disable indent, no-process-exit */
const _ = require('lodash');
const { config, Dependencies } = require('@jsdoc/core');
const { Dictionary } = require('jsdoc/tag/dictionary');
const Engine = require('@jsdoc/cli');
const { EventBus, log } = require('@jsdoc/util');
const { Filter } = require('jsdoc/src/filter');
const fs = require('fs');
const { Package } = require('jsdoc/package');
const path = require('path');
const { Scanner } = require('jsdoc/src/scanner');
const stripBom = require('strip-bom');
const stripJsonComments = require('strip-json-comments');
const { taffy } = require('taffydb');
const Promise = require('bluebird');

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
  cli.runTests = () => require('./test')(dependencies);

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
    let sourceFile;
    let sourceFiles = options._ ? options._.slice(0) : [];

    if (conf.source && conf.source.include) {
      sourceFiles = sourceFiles.concat(config.source.include);
    }

    // load the user-specified package file, if any
    if (options.package) {
      packageJson = readPackageJson(options.package);
    }

    // source files named `package.json` or `README.md` get special treatment, unless the user
    // explicitly specified a package and/or README file
    for (let i = 0, l = sourceFiles.length; i < l; i++) {
      sourceFile = sourceFiles[i];

      if (!options.package && /\bpackage\.json$/i.test(sourceFile)) {
        packageJson = readPackageJson(sourceFile);
        sourceFiles.splice(i--, 1);
      }

      if (!options.readme && /(\bREADME|\.md)$/i.test(sourceFile)) {
        options.readme = sourceFile;
        sourceFiles.splice(i--, 1);
      }
    }

    // Resolve the path to the README.
    if (options.readme) {
      options.readme = path.resolve(options.readme);
    }

    props.packageJson = packageJson;

    return sourceFiles;
  }

  // TODO: docs
  cli.scanFiles = () => {
    const conf = dependencies.get('config');
    const env = dependencies.get('env');
    const options = dependencies.get('options');
    let filter;
    let scanner;

    options._ = buildSourceList();

    // are there any files to scan and parse?
    if (conf.source && options._.length) {
      filter = new Filter(conf.source);
      scanner = new Scanner();

      env.sourceFiles = scanner.scan(
        options._,
        options.recurse ? conf.recurseDepth : undefined,
        filter
      );
    }

    return cli;
  };

  cli.createParser = () => {
    // Must be imported after the config is loaded.
    const handlers = require('jsdoc/src/handlers');
    const parser = require('jsdoc/src/parser');
    const plugins = require('jsdoc/plugins');

    const conf = dependencies.get('config');

    props.parser = parser.createParser(dependencies);

    if (conf.plugins) {
      plugins.installPlugins(conf.plugins, props.parser);
    }

    handlers.attachTo(props.parser);

    return cli;
  };

  cli.parseFiles = () => {
    // Must be imported after the config is loaded.
    const augment = require('jsdoc/augment');
    const borrow = require('jsdoc/borrow');

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
    augment.augmentAll(docs);
    log.debug('Adding borrowed doclets...');
    borrow.resolveBorrows(docs);
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
