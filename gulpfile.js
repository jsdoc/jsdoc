/* eslint max-nested-callbacks: 0 */
const eslint = require('gulp-eslint');
const { exec } = require('child_process');
const gulp = require('gulp');
const jsonEditor = require('gulp-json-editor');
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

function bump(cb) {
    gulp.src('./package.json')
        .pipe(jsonEditor({
            revision: String( Date.now() )
        }))
        .pipe(gulp.dest('./'));

    cb();
}

function coverage(cb) {
    const cmd = `./node_modules/.bin/nyc --reporter=html ${options.nodeBin} -T`;

    exec(cmd, execCb.bind(null, cb));
}

function lint(cb) {
    gulp.src(options.lintPaths)
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());

    cb();
}

function test(cb) {
    const cmd = `${options.nodePath} "${options.nodeBin}" -T`;

    exec(cmd, execCb.bind(null, cb));
}

exports.bump = bump;
exports.coverage = coverage;
exports.default = gulp.series(lint, test);
exports.lint = lint;
exports.test = test;
