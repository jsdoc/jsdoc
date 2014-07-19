/*
    Copyright 2014 Google Inc. All rights reserved.

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

var csso = require('gulp-csso');
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglify');

var bowerPath = './bower_components';
// TODO: make this configurable
var source = {
    js: {
        copy: [
            path.join(bowerPath, 'jquery/dist/jquery.min.js'),
        ],
        minify: [
            './scripts/*.js',
            path.join(bowerPath, 'google-code-prettify/src/prettify.js'),
            path.join(bowerPath, 'google-code-prettify/src/lang-css.js'),
            path.join(bowerPath, 'jquery.cookie/jquery.cookie.js'),
            path.join(bowerPath, 'jqtree/tree.jquery.js')
        ]
    },
    less: './styles/baseline.less'
};

var target = {
    css: './static/css',
    js: './static/scripts'
};

gulp.task('build', ['css', 'js']);

gulp.task('css', function() {
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

gulp.task('default', ['build']);
