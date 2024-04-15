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

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import Engine from '@jsdoc/cli';
import { Dictionary } from '@jsdoc/tag';
import stripBom from 'strip-bom';

import test from './test/index.js';

function createEngine() {
  const packageJsonPath = fileURLToPath(new URL('package.json', import.meta.url));
  // Allow this to throw; if we can't read our own package file, something is really wrong.
  const packageInfo = JSON.parse(stripBom(fs.readFileSync(packageJsonPath, 'utf8')));
  const revision = new Date(parseInt(packageInfo.revision, 10));
  const { version } = packageInfo;

  return new Engine({ revision, version });
}

/**
 * Helper methods for running JSDoc on the command line.
 *
 * @private
 */
export default (() => {
  const cli = {};
  let engine;
  let env;
  let log;

  cli.initialize = () => {
    engine = createEngine();
    env = engine.env;
    log = engine.log;

    engine.configureLogger();

    return engine.loadConfig();
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

    cli.logStart();

    // If we already need to exit with an error, don't do any more work.
    if (engine.shouldExitWithError) {
      cmd = () => Promise.resolve(1);
    } else if (options.help) {
      cmd = () => engine.printHelp();
    } else if (options.test) {
      cmd = cli.runTests;
    } else if (options.version) {
      cmd = () => engine.printVersion();
    } else {
      cmd = () => engine.generate();
    }

    // TODO: Await the promise and use try-catch.
    return cmd().then((errorCode) => {
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

  return cli;
})();
