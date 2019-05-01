#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const env = require('./lib/jsdoc/env');
const cli = require('./cli');

let jsdocPath = __dirname;

// resolve the path if it's a symlink
if ( fs.statSync(jsdocPath).isSymbolicLink() ) {
    jsdocPath = path.resolve( path.dirname(jsdocPath), fs.readlinkSync(jsdocPath) );
}

env.dirname = jsdocPath;
env.pwd = process.cwd();
env.args = process.argv.slice(2);

function cb(errorCode) {
    cli.logFinish();
    cli.exit(errorCode || 0);
}

cli.setVersionInfo()
    .loadConfig();

if (!env.opts.test) {
    cli.configureLogger();
}

cli.logStart();
cli.runCommand(cb);
