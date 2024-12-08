#!/usr/bin/env node
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
import stripBom from 'strip-bom';

async function createEngine() {
  const packageJsonPath = fileURLToPath(new URL('package.json', import.meta.url));
  // Allow this to throw; if we can't read our own package file, something is really wrong.
  const packageInfo = JSON.parse(stripBom(fs.readFileSync(packageJsonPath, 'utf8')));
  const revision = new Date(parseInt(packageInfo.revision, 10));
  const { version } = packageInfo;
  const engine = new Engine({ revision, version });

  engine.configureLogger();
  await engine.loadConfig();

  return engine;
}

function logStart(engine) {
  const { env, log } = engine;

  log.debug(engine.versionDetails);
  log.debug('Environment info: %j', {
    env: {
      conf: env.config,
      opts: env.options,
    },
  });
}

function logFinish(engine) {
  let delta;
  let deltaSeconds;
  const { env, log } = engine;

  if (env.run.finish && env.run.start) {
    delta = env.run.finish.getTime() - env.run.start.getTime();
    deltaSeconds = (delta / 1000).toFixed(2);
    log.info(`Finished running in ${deltaSeconds} seconds.`);
  }
}

function runCommand(engine) {
  let cmd;
  const { options } = engine.env;

  logStart(engine);

  // If we already need to exit with an error, don't do any more work.
  if (engine.shouldExitWithError) {
    cmd = () => Promise.resolve(1);
  } else if (options.help) {
    cmd = () => engine.printHelp();
  } else if (options.version) {
    cmd = () => engine.printVersion();
  } else {
    cmd = () => engine.generate();
  }

  return cmd().then((errorCode) => {
    logFinish(engine);
    engine.exit(errorCode || 0);
  });
}

(async () => {
  const engine = await createEngine();

  await runCommand(engine);
})();
