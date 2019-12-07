const eslint = require('gulp-eslint');
const { exec } = require('child_process');
const gulp = require('gulp');
const path = require('path');

function execCb(cb, err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
}

const options = {
    coveragePaths: [
        '*.js',
        'packages/**/*.js',
        '!packages/**/test/*.js',
        '!packages/**/test/**/*.js',
        '!packages/**/static/*.js'
    ],
    lintPaths: [
        '*.js',
        'packages/**/*.js',
        '!packages/**/static/*.js'
    ],
    nodeBin: path.resolve(__dirname, './packages/jsdoc/jsdoc.js'),
    nodePath: process.execPath
};

function coverage(cb) {
    const cmd = `./node_modules/.bin/nyc --reporter=html ${options.nodeBin} -T`;

    return exec(cmd, execCb.bind(null, cb));
}

function lint() {
    return gulp.src(options.lintPaths)
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
exports.lint = lint;
exports.test = test;
