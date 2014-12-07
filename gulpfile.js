/*eslint max-nested-callbacks: 0 */
'use strict';

var eslint = require('gulp-eslint');
var exec = require('child_process').exec;
var gulp = require('gulp');
var istanbul = require('istanbul');
var jsonEditor = require('gulp-json-editor');
var os = require('os');
var path = require('path');
var util = require('util');

function execCb(cb, err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
}

var options = {
    coveragePaths: [
        '*.js',
        'lib/**/*.js',
        'plugins/*.js'
    ],
    lintPaths: [
        '*.js',
        'lib/**/*.js',
        'plugins/*.js',
        'templates/default/*.js',
        'templates/haruki/*.js',
        'test/specs/**/*.js'
    ],
    nodeBin: path.resolve(__dirname, './jsdoc.js'),
    nodePath: process.execPath,
    rhinoBin: (function() {
        var filepath = path.resolve(__dirname, './jsdoc');

        if (os.platform().indexOf('win') === 0) {
            filepath += '.cmd';
        }

        return filepath;
    })()
};

gulp.task('bump', function() {
    gulp.src('./package.json')
        .pipe(jsonEditor({
            revision: String( Date.now() )
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('coverage', function(cb) {
    var cmd = util.format('./node_modules/.bin/istanbul cover %s -- -T', options.nodeBin);
    exec(cmd, execCb.bind(null, cb));
});

gulp.task('lint', function() {
    var pipeline = gulp.src(options.lintPaths)
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
});

gulp.task('test-node', function(cb) {
    var cmd = util.format('%s "%s" -T', options.nodePath, options.nodeBin);
    exec(cmd, execCb.bind(null, cb));
});

gulp.task('test-rhino', function(cb) {
    var cmd = util.format('"%s" -T -q "parser=rhino"', options.rhinoBin);
    exec(cmd, execCb.bind(null, cb));
});

gulp.task('test-rhino-esprima', function(cb) {
    var cmd = util.format('"%s" -T -q "parser=esprima"', options.rhinoBin);
    exec(cmd, execCb.bind(null, cb));
});

gulp.task('test', ['lint', 'test-node', 'test-rhino', 'test-rhino-esprima']);
gulp.task('default', ['test']);
