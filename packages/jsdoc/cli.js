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
import { fileURLToPath } from 'node:url';

import Engine from '@jsdoc/cli';
import { Dictionary } from '@jsdoc/tag';
import stripBom from 'strip-bom';

import test from './test/index.js';

/**
 * Helper methods for running JSDoc on the command line.
 *
 * @private
 */
export default (() => {
  const cli = {};
  let docs = null;
  const engine = new Engine();
  const { api, env, log } = engine;

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
  cli.loadConfig = () => engine.loadConfig();

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
    let result;

    env.tags = Dictionary.fromConfig(env);
    result = await test(env);

    return result.overallStatus === 'failed' ? 1 : 0;
  };

  // TODO: docs
  cli.main = async () => {
    await api.findSourceFiles();

    if (env.sourceFiles.length === 0) {
      console.log('There are no input files to process.');

      return Promise.resolve(0);
    } else {
      docs = await api.parseSourceFiles();

      return cli.processParseResults().then(() => {
        env.run.finish = new Date();

        return 0;
      });
    }
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
      doclets = docs.allDoclets;
    } else {
      doclets = docs.doclets;
    }

    console.log(JSON.stringify(Array.from(doclets), null, 2));

    return cli;
  };

  cli.generateDocs = () => api.generateDocs(docs);

  return cli;
})();
