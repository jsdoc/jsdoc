const eslint = require('gulp-eslint7');
const { exec } = require('child_process');
const gulp = require('gulp');
const { LicenseChecker } = require('js-green-licenses');
const path = require('path');
const prettier = require('gulp-prettier');

function execCb(cb, err, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);
  cb(err);
}

const options = {
  lintPaths: [
    '*.js',
    'packages/**/*.js',
    '!packages/**/static/*.js',
    '!packages/**/test/fixtures/**/*.js',
  ],
  nodeBin: path.resolve(__dirname, './packages/jsdoc/jsdoc.js'),
  nodePath: process.execPath,
};

function coverage(cb) {
  const cmd = `./node_modules/.bin/nyc --reporter=html ${options.nodeBin} -T`;

  return exec(cmd, execCb.bind(null, cb));
}

function format() {
  return gulp.src(options.lintPaths, { base: './' }).pipe(prettier()).pipe(gulp.dest('./'));
}

function licenses() {
  const checker = new LicenseChecker({ verbose: false });
  const log = console.log;

  return new Promise((resolve, reject) => {
    // Temporarily silence console.log() to prevent unnecessary output.
    /* eslint-disable no-empty-function */
    console.log = () => {};
    /* eslint-enable no-empty-function */

    checker.on('end', () => {
      console.log = log;
      resolve();
    });
    checker.on('error', (e) => {
      const message =
        `Error while processing ${e.packageName}@${e.versionSpec}: ${e.err}. ` +
        `Parent packages: ${JSON.stringify(e.parentPackages, null, 0)}`;

      console.log = log;
      reject(new Error(message));
    });
    checker.on('non-green-license', (e) => {
      const message =
        `${e.packageName}@${e.version} has an invalid license: ${e.licenseName}. ` +
        `Parent packages: ${JSON.stringify(e.parentPackages, null, 0)}`;

      console.log = log;
      reject(new Error(message));
    });

    checker.checkLocalDirectory('.');
  });
}

function lint() {
  return gulp
    .src(options.lintPaths)
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failAfterError());
}

function test(cb) {
  const cmd = `${options.nodePath} "${options.nodeBin}" -T`;

  return exec(cmd, execCb.bind(null, cb));
}

exports.coverage = coverage;
exports.default = gulp.series(licenses, lint, test);
exports.format = format;
exports.licenses = licenses;
exports.lint = lint;
exports.test = test;
