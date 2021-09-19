const eslint = require('gulp-eslint7');
const { exec } = require('child_process');
const gulp = require('gulp');
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
exports.default = gulp.series(lint, test);
exports.format = format;
exports.lint = lint;
exports.test = test;
