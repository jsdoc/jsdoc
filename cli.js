/* eslint-disable indent, no-process-exit */
/**
 * Helper methods for running JSDoc on the command line.
 *
 * A few critical notes for anyone who works on this module:
 *
 * + The module should really export an instance of `cli`, and `props` should be properties of a
 * `cli` instance.
 *
 * @private
 */
module.exports = (() => {
    const env = require('jsdoc/env');
    const logger = require('@jsdoc/logger');
    const stripBom = require('strip-bom');
    const stripJsonComments = require('strip-json-comments');
    const Promise = require('bluebird');

    const props = {
        docs: [],
        packageJson: null,
        shouldExitWithError: false,
        tmpdir: null
    };

    const FATAL_ERROR_MESSAGE = 'Exiting JSDoc because an error occurred. See the previous log ' +
        'messages for details.';
    const cli = {};

    // TODO: docs
    cli.setVersionInfo = () => {
        const fs = require('fs');
        const path = require('path');

        // allow this to throw--something is really wrong if we can't read our own package file
        const info = JSON.parse(stripBom(fs.readFileSync(path.join(env.dirname, 'package.json'),
            'utf8')));

        env.version = {
            number: info.version,
            revision: new Date( parseInt(info.revision, 10) ).toUTCString()
        };

        return cli;
    };

    // TODO: docs
    cli.loadConfig = () => {
        const _ = require('lodash');
        const args = require('@jsdoc/cli').args;
        let conf;
        const config = require('@jsdoc/config');

        try {
            env.opts = args.parse(env.args);
        }
        catch (e) {
            console.error(`${e.message}\n`);
            cli.printHelp().then(() => {
                cli.exit(1);
            });
        }

        try {
            conf = config.loadSync(env.opts.configure);
            env.conf = conf.config;
        } catch (e) {
            cli.exit(
                1,
                `Cannot parse the config file ${conf.filepath}: ${e}\n${FATAL_ERROR_MESSAGE}`
            );
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

        if (!env.opts.test) {
            if (env.opts.debug) {
                logger.setLevel(logger.LEVELS.DEBUG);
            }
            else if (env.opts.verbose) {
                logger.setLevel(logger.LEVELS.INFO);
            }

            if (env.opts.pedantic) {
                logger.once('logger:warn', recoverableError);
                logger.once('logger:error', fatalError);
            }
            else {
                logger.once('logger:error', recoverableError);
            }

            logger.once('logger:fatal', fatalError);
        }

        return cli;
    };

    // TODO: docs
    cli.logStart = () => {
        logger.debug(cli.getVersion());

        logger.debug('Environment info: %j', {
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
            logger.info('Finished running in %s seconds.', deltaSeconds);
        }
    };

    // TODO: docs
    cli.runCommand = cb => {
        let cmd;

        const opts = env.opts;

        if (opts.help) {
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

        cmd().then(errorCode => {
            if (!errorCode && props.shouldExitWithError) {
                errorCode = 1;
            }
            cb(errorCode);
        });
    };

    // TODO: docs
    cli.printHelp = () => {
        cli.printVersion();
        console.log( `\n${require('@jsdoc/cli').help}\n` );
        console.log('Visit http://usejsdoc.org for more information.');

        return Promise.resolve(0);
    };

    // TODO: docs
    cli.runTests = () => {
        console.log('Running tests...');

        return require('./test')();
    };

    // TODO: docs
    cli.getVersion = () => `JSDoc ${env.version.number} (${env.version.revision})`;

    // TODO: docs
    cli.printVersion = () => {
        console.log( cli.getVersion() );

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
            logger.error('Unable to read the package file "%s"', filepath);

            return null;
        }
    }

    function buildSourceList() {
        const Readme = require('jsdoc/readme');

        let packageJson;
        let readmeHtml;
        let sourceFile;
        let sourceFiles = env.opts._ ? env.opts._.slice(0) : [];

        if (env.conf.source && env.conf.source.include) {
            sourceFiles = sourceFiles.concat(env.conf.source.include);
        }

        // load the user-specified package/README files, if any
        if (env.opts.package) {
            packageJson = readPackageJson(env.opts.package);
        }
        if (env.opts.readme) {
            readmeHtml = new Readme(env.opts.readme).html;
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
                readmeHtml = new Readme(sourceFile).html;
                sourceFiles.splice(i--, 1);
            }
        }

        props.packageJson = packageJson;
        env.opts.readme = readmeHtml;

        return sourceFiles;
    }

    // TODO: docs
    cli.scanFiles = () => {
        const Filter = require('jsdoc/src/filter').Filter;
        const Scanner = require('jsdoc/src/scanner').Scanner;

        let filter;
        let scanner;

        env.opts._ = buildSourceList();

        // are there any files to scan and parse?
        if (env.conf.source && env.opts._.length) {
            filter = new Filter(env.conf.source);
            scanner = new Scanner();

            env.sourceFiles = scanner.scan(env.opts._,
                (env.opts.recurse ? env.conf.source.maxDepth : undefined), filter);
        }

        return cli;
    };

    cli.createParser = () => {
        const handlers = require('jsdoc/src/handlers');
        const parser = require('jsdoc/src/parser');
        const plugins = require('jsdoc/plugins');

        props.parser = parser.createParser(env.conf.parser);

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

        logger.debug('Adding inherited symbols, mixins, and interface implementations...');
        augment.augmentAll(docs);
        logger.debug('Adding borrowed doclets...');
        borrow.resolveBorrows(docs);
        logger.debug('Post-processing complete.');

        props.parser.fireProcessingComplete(docs);

        return cli;
    };

    cli.processParseResults = () => {
        if (env.opts.explain) {
            cli.dumpParseResults();

            return Promise.resolve();
        }
        else {
            cli.resolveTutorials();

            return cli.generateDocs();
        }
    };

    cli.dumpParseResults = () => {
        console.log(JSON.stringify(props.docs, null, 4));

        return cli;
    };

    cli.resolveTutorials = () => {
        const resolver = require('jsdoc/tutorial/resolver');

        if (env.opts.tutorials) {
            resolver.load(env.opts.tutorials);
            resolver.resolve();
        }

        return cli;
    };

    cli.generateDocs = () => {
        const resolver = require('jsdoc/tutorial/resolver');


        let template;

        env.opts.template = env.opts.template || '@jsdoc/template-original';

        try {
            template = require(env.opts.template);
        }
        catch (e) {
            logger.fatal(`Unable to load template: ${e.message}` || e);
        }

        // templates should export a "publish" function
        if (template.publish && typeof template.publish === 'function') {
            let publishPromise;

            logger.info('Generating output files...');
            publishPromise = template.publish(
                {
                    doclets: props.docs,
                    tutorials: resolver.root
                },
                env.opts
            );

            return Promise.resolve(publishPromise);
        }
        else {
            logger.fatal(`${env.opts.template} does not export a "publish" function.`);
        }

        return Promise.resolve();
    };

    // TODO: docs
    cli.exit = (exitCode, message) => {
        if (exitCode > 0 && message) {
            console.error(message);
        }
        process.on('exit', () => { process.exit(exitCode); });
    };

    return cli;
})();
