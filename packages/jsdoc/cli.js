/* eslint-disable indent, no-process-exit */

const { config } = require('@jsdoc/core');
const Engine = require('@jsdoc/cli');
const env = require('jsdoc/env');
const { EventBus, log } = require('@jsdoc/util');
const path = require('path');
const stripBom = require('strip-bom');
const stripJsonComments = require('strip-json-comments');
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
        tmpdir: null
    };

    const bus = new EventBus('jsdoc');
    const cli = {};
    const engine = new Engine();
    const FATAL_ERROR_MESSAGE = 'Exiting JSDoc because an error occurred. See the previous log ' +
        'messages for details.';
    const LOG_LEVELS = Engine.LOG_LEVELS;

    // TODO: docs
    cli.setVersionInfo = () => {
        const fs = require('fs');

        // allow this to throw--something is really wrong if we can't read our own package file
        const info = JSON.parse(stripBom(fs.readFileSync(path.join(env.dirname, 'package.json'),
            'utf8')));
        const revision = new Date(parseInt(info.revision, 10));

        env.version = {
            number: info.version,
            revision: revision.toUTCString()
        };

        engine.version = env.version.number;
        engine.revision = revision;

        return cli;
    };

    // TODO: docs
    cli.loadConfig = () => {
        const _ = require('lodash');
        let conf;

        try {
            env.opts = engine.parseFlags(env.args);
        }
        catch (e) {
            props.shouldPrintHelp = true;
            cli.exit(
                1,
                `${e.message}\n`
            );

            return cli;
        }

        try {
            conf = config.loadSync(env.opts.configure);
            env.conf = conf.config;
        }
        catch (e) {
            cli.exit(
                1,
                `Cannot parse the config file ${conf.filepath}: ${e}\n${FATAL_ERROR_MESSAGE}`
            );

            return cli;
        }

        // look for options on the command line, then in the config
        env.opts = _.defaults(env.opts, env.conf.opts);

        return cli;
    };

    // TODO: docs
    cli.configureLogger = () => {
        function recoverableError() {
            props.shouldExitWithError = true;
        }

        function fatalError() {
            cli.exit(1);
        }

        if (env.opts.test) {
            engine.logLevel = LOG_LEVELS.SILENT;
        } else {
            if (env.opts.debug) {
                engine.logLevel = LOG_LEVELS.DEBUG;
            }
            else if (env.opts.verbose) {
                engine.logLevel = LOG_LEVELS.INFO;
            }

            if (env.opts.pedantic) {
                bus.once('logger:warn', recoverableError);
                bus.once('logger:error', fatalError);
            }
            else {
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
                conf: env.conf,
                opts: env.opts
            }
        });
    };

    // TODO: docs
    cli.logFinish = () => {
        let delta;
        let deltaSeconds;

        if (env.run.finish && env.run.start) {
            delta = env.run.finish.getTime() - env.run.start.getTime();
        }

        if (delta !== undefined) {
            deltaSeconds = (delta / 1000).toFixed(2);
            log.info(`Finished running in ${deltaSeconds} seconds.`);
        }
    };

    // TODO: docs
    cli.runCommand = () => {
        let cmd;
        const opts = env.opts;

        // If we already need to exit with an error, don't do any more work.
        if (props.shouldExitWithError) {
            cmd = () => Promise.resolve(0);
        }
        else if (opts.help) {
            cmd = cli.printHelp;
        }
        else if (opts.test) {
            cmd = cli.runTests;
        }
        else if (opts.version) {
            cmd = cli.printVersion;
        }
        else {
            cmd = cli.main;
        }

        return cmd().then(errorCode => {
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
    cli.runTests = () => require('./test')();

    // TODO: docs
    cli.printVersion = () => {
        console.log(engine.versionDetails);

        return Promise.resolve(0);
    };

    // TODO: docs
    cli.main = () => {
        cli.scanFiles();

        if (env.sourceFiles.length === 0) {
            console.log('There are no input files to process.');

            return Promise.resolve(0);
        } else {
            return cli.createParser()
                .parseFiles()
                .processParseResults()
                .then(() => {
                    env.run.finish = new Date();

                    return 0;
                });
        }
    };

    function readPackageJson(filepath) {
        const fs = require('fs');

        try {
            return stripJsonComments( fs.readFileSync(filepath, 'utf8') );
        }
        catch (e) {
            log.error(`Unable to read the package file ${filepath}`);

            return null;
        }
    }

    function buildSourceList() {
        let packageJson;
        let sourceFile;
        let sourceFiles = env.opts._ ? env.opts._.slice(0) : [];

        if (env.conf.source && env.conf.source.include) {
            sourceFiles = sourceFiles.concat(env.conf.source.include);
        }

        // load the user-specified package file, if any
        if (env.opts.package) {
            packageJson = readPackageJson(env.opts.package);
        }

        // source files named `package.json` or `README.md` get special treatment, unless the user
        // explicitly specified a package and/or README file
        for (let i = 0, l = sourceFiles.length; i < l; i++) {
            sourceFile = sourceFiles[i];

            if ( !env.opts.package && /\bpackage\.json$/i.test(sourceFile) ) {
                packageJson = readPackageJson(sourceFile);
                sourceFiles.splice(i--, 1);
            }

            if ( !env.opts.readme && /(\bREADME|\.md)$/i.test(sourceFile) ) {
                env.opts.readme = sourceFile;
                sourceFiles.splice(i--, 1);
            }
        }

        // Resolve the path to the README.
        if (env.opts.readme) {
            env.opts.readme = path.resolve(env.opts.readme);
        }

        props.packageJson = packageJson;

        return sourceFiles;
    }

    // TODO: docs
    cli.scanFiles = () => {
        const { Filter } = require('jsdoc/src/filter');
        const { Scanner } = require('jsdoc/src/scanner');

        let filter;
        let scanner;

        env.opts._ = buildSourceList();

        // are there any files to scan and parse?
        if (env.conf.source && env.opts._.length) {
            filter = new Filter(env.conf.source);
            scanner = new Scanner();

            env.sourceFiles = scanner.scan(env.opts._,
                (env.opts.recurse ? env.conf.recurseDepth : undefined), filter);
        }

        return cli;
    };

    cli.createParser = () => {
        const handlers = require('jsdoc/src/handlers');
        const parser = require('jsdoc/src/parser');
        const plugins = require('jsdoc/plugins');

        props.parser = parser.createParser(env.conf.parser, env.conf);

        if (env.conf.plugins) {
            plugins.installPlugins(env.conf.plugins, props.parser);
        }

        handlers.attachTo(props.parser);

        return cli;
    };

    cli.parseFiles = () => {
        const augment = require('jsdoc/augment');
        const borrow = require('jsdoc/borrow');
        const Package = require('jsdoc/package').Package;

        let docs;
        let packageDocs;

        props.docs = docs = props.parser.parse(env.sourceFiles, env.opts.encoding);

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
        if (env.opts.explain) {
            cli.dumpParseResults();

            return Promise.resolve();
        }
        else {
            return cli.generateDocs();
        }
    };

    cli.dumpParseResults = () => {
        console.log(JSON.stringify(props.docs, null, 4));

        return cli;
    };

    cli.generateDocs = () => {
        let message;
        const taffy = require('taffydb').taffy;

        let template;

        env.opts.template = env.opts.template || path.join(__dirname, 'templates', 'default');

        try {
            // TODO: Just look for a `publish` function in the specified module, not a `publish.js`
            // file _and_ a `publish` function.
            template = require(`${env.opts.template}/publish`);
        }
        catch (e) {
            log.fatal(`Unable to load template: ${e.message}` || e);
        }

        // templates should include a publish.js file that exports a "publish" function
        if (template.publish && typeof template.publish === 'function') {
            let publishPromise;

            log.info('Generating output files...');
            publishPromise = template.publish(
                taffy(props.docs),
                env.opts
            );

            return Promise.resolve(publishPromise);
        }
        else {
            message = `${env.opts.template} does not export a "publish" function. ` +
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
