/* global require: true */
/*
    Copyright 2014-2017 Google Inc. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
const csso = require('gulp-csso');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const uglify = require('gulp-uglify');

// Patch the `require` function so it can locate JSDoc modules and dependencies.
// Must be called before any Gulp task that uses JSDoc modules.
function patchRequire() {
    var jsdocPath = path.join(__dirname, 'node_modules/jsdoc');

    require = require('requizzle')({
        requirePaths: {
            before: [path.join(jsdocPath, 'lib')],
            after: [path.join(jsdocPath, 'node_modules')]
        },
        infect: true
    });
}

const bowerPath = './bower_components';
// TODO: make this configurable
const source = {
    code: ['./publish.js', './lib/**/*.js', './scripts/**/*.js'],
    js: {
        copy: [
            path.join(bowerPath, 'jquery/dist/jquery.min.js')
        ],
        minify: [
            './scripts/*.js',
            path.join(bowerPath, 'google-code-prettify/src/prettify.js'),
            path.join(bowerPath, 'google-code-prettify/src/lang-css.js'),
            path.join(bowerPath, 'jquery.cookie/jquery.cookie.js'),
            path.join(bowerPath, 'jqtree/tree.jquery.js')
        ]
    },
    less: './styles/bootstrap/baseline.less',
    tests: ['./test/specs/**/*.js'],
    views: ['./views/**/*.hbs']
};

const target = {
    css: './static/css',
    js: './static/scripts'
};

function coverage(cb) {
    let istanbul;

    patchRequire();
    istanbul = require('gulp-istanbul');

    gulp.src(source.code)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', () => {
            gulp.src(source.tests)
                .pipe(require('gulp-mocha')())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
}

function css(cb) {
    gulp.src(source.less)
        .pipe(less())
        .pipe(gulp.dest(target.css));

    cb();
}

function cssMinify(cb) {
    gulp.src(source.less)
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest(target.css));

    cb();
}

function jsCopy(cb) {
    source.js.copy.forEach(item => {
        gulp.src(item)
            .pipe(gulp.dest(target.js));
    });

    cb();
}

function jsMinify(cb) {
    source.js.minify.forEach(item => {
        gulp.src(item)
            .pipe(uglify())
            .pipe(gulp.dest(target.js));
    });

    cb();
}

function lint(cb) {
    gulp.src(source.code.concat(source.tests))
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());

    cb();
}

function mocha(cb) {
    patchRequire();

    gulp.src(source.tests, { read: false })
        .pipe(require('gulp-mocha')());

    cb();
}

exports.coverage = coverage;
exports.css = css;
exports['css-minify'] = cssMinify;
exports['js-copy'] = jsCopy;
exports['js-minify'] = jsMinify;
exports.lint = lint;
exports.mocha = mocha;

exports.js = gulp.series(exports['js-copy'], exports['js-minify']);
exports.build = gulp.parallel(exports['css-minify'], exports.js);
exports.default = gulp.series(exports.lint, exports.mocha);
exports.dev = gulp.parallel(exports.css, exports.js);
exports.test = exports.default;
