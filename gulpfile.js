/*
    Copyright 2014-2019 Google LLC

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
/* global require: true */
const ConsoleReporter = require('jasmine-console-reporter');
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
const source = {
    code: ['./publish.js', './lib/**/*.js', './scripts/**/*.js'],
    helpers: [
        './test/helpers/**/*.js',
        './node_modules/jasmine-expect'
    ],
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

function css() {
    return gulp.src(source.less)
        .pipe(less())
        .pipe(gulp.dest(target.css));
}

function cssMinify() {
    return gulp.src(source.less)
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest(target.css));
}

function jsCopy() {
    return gulp.src(source.js.copy)
        .pipe(gulp.dest(target.js));
}

function jsMinify() {
    return gulp.src(source.js.minify)
        .pipe(uglify())
        .pipe(gulp.dest(target.js));
}

function lint() {
    return gulp.src(source.code.concat(source.tests))
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
}

function jasmine() {
    let gulpJasmine;
    const reporter = new ConsoleReporter({
        beep: false,
        verbosity: {
            disabled: false,
            pending: false,
            specs: false,
            summary: true
        }
    });

    patchRequire();
    gulpJasmine = require('gulp-jasmine')({
        config: {
            helpers: source.helpers,
            random: false
        },
        reporter
    });

    require('add-matchers').addMatchers({
        toBeInstanceOf: (klass, obj) => {
            const actualClassName = obj && obj.constructor ? obj.constructor.name : undefined;
            let expectedClassName;

            if (typeof klass === 'string') {
                expectedClassName = klass;
            } else {
                expectedClassName = klass.name;
            }

            if (actualClassName !== expectedClassName) {
                return false;
            }

            return true;
        }
    });

    return gulp.src(source.tests)
        .pipe(gulpJasmine);
}

exports.css = css;
exports['css-minify'] = cssMinify;
exports.jasmine = jasmine;
exports['js-copy'] = jsCopy;
exports['js-minify'] = jsMinify;
exports.lint = lint;
// For backwards compatibility.
exports.mocha = jasmine;

exports.js = gulp.series(exports['js-copy'], exports['js-minify']);
exports.build = gulp.parallel(exports['css-minify'], exports.js);
exports.default = gulp.series(exports.lint, exports.mocha);
exports.dev = gulp.parallel(exports.css, exports.js);
exports.test = exports.default;
