/*
    Copyright 2014-2015 Google Inc. All rights reserved.

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
'use strict';

var concat = require('gulp-concat');
var csso = require('gulp-csso');
var declare = require('gulp-declare');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var less = require('gulp-less');
var map = require('vinyl-map');
var path = require('path');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

// Patch the `require` function so it can locate JSDoc modules and dependencies.
// Must be called before any Gulp task that uses JSDoc modules.
function patchRequire() {
    /*eslint no-undef: 0 */
    var jsdocPath = path.join(__dirname, 'node_modules/jsdoc');

    require = require('requizzle')({
        requirePaths: {
            before: [path.join(jsdocPath, 'lib')],
            after: [path.join(jsdocPath, 'node_modules')]
        },
        infect: true
    });
}

var bowerPath = './bower_components';
// TODO: make this configurable
var source = {
    code: ['publish.js', 'lib/**/*.js', 'scripts/**/*.js'],
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
    tests: ['test/specs/**/*.js'],
    views: ['./views/**/*.hbs']
};

var target = {
    css: './static/css',
    js: './static/scripts'
};

gulp.task('build', ['compile', 'css-minify', 'js']);
gulp.task('dev', ['compile', 'css', 'js']);

// Precompile the Handlebars views.
gulp.task('compile', function(cb) {
    var preprocess = require('./lib/loader').preprocess;

    gulp.src(source.views)
        // preprocess the views before Handlebars compiles them
        .pipe(map(function(src) {
            return preprocess(src.toString());
        }))
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('handlebars.template(<%= contents %>)'))
        .pipe(declare({
            root: 'exports',
            noRedeclare: true
        }))
        .pipe(concat('index.js'))
        .pipe(wrap('var handlebars = require(\'handlebars\');\n\n<%= contents %>'))
        .pipe(gulp.dest('./views'))
        .on('end', cb);
});

gulp.task('coverage', function(cb) {
    var istanbul;

    patchRequire();
    istanbul = require('gulp-istanbul');

    gulp.src(source.code)
        .pipe(istanbul())
        .on('finish', function() {
            gulp.src(source.tests)
                .pipe(require('gulp-mocha')())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
});

gulp.task('css', function() {
    gulp.src(source.less)
        .pipe(less())
        .pipe(gulp.dest(target.css));
});

gulp.task('css-minify', function() {
    gulp.src(source.less)
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest(target.css));
});

gulp.task('js', ['js-copy', 'js-minify']);

gulp.task('js-copy', function() {
    source.js.copy.forEach(function(item) {
        gulp.src(item)
            .pipe(gulp.dest(target.js));
    });
});

gulp.task('js-minify', function() {
    source.js.minify.forEach(function(item) {
        gulp.src(item)
            .pipe(uglify())
            .pipe(gulp.dest(target.js));
    });
});

gulp.task('lint', function() {
    gulp.src(source.code.concat(source.tests))
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
});

gulp.task('test', function() {
    patchRequire();

    gulp.src(source.tests, { read: false })
        .pipe(require('gulp-mocha')());
});

gulp.task('watch-dev', ['dev'], function() {
    gulp.watch(['scripts/**/*.js', 'styles/**/*', 'views/**/*.hbs', path.join(bowerPath, '**/*')],
        ['dev']);
});

gulp.task('default', ['dev']);
