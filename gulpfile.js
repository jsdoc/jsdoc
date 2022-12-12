/*
    Copyright 2014-2020 Google LLC

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
const ConsoleReporter = require('jasmine-console-reporter');
const csso = require('gulp-csso');
const eslint = require('gulp-eslint-new');
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const prettier = require('gulp-prettier');
const uglify = require('gulp-uglify');

const NODE_MODULES_PATH = path.join(__dirname, 'node_modules');

const source = {
  code: ['./publish.js', './lib/**/*.js', './scripts/**/*.js'],
  css: './styles/hljs-tomorrow.css',
  helpers: ['./test/helpers/**/*.js', './node_modules/@jsdoc/test-matchers'],
  js: {
    copy: [path.join(NODE_MODULES_PATH, 'jquery/dist/jquery.min.js')],
    minify: ['./scripts/*.js', path.join(NODE_MODULES_PATH, 'jqtree/tree.jquery.js')],
  },
  less: './styles/bootstrap/baseline.less',
  lint: [
    '*.js',
    './lib/**/*.js',
    './scripts/**/*.js',
    './test/**/*.js',
    '!./test/fixtures/**/*.js',
  ],
  tests: ['./test/specs/**/*.js'],
  views: ['./views/**/*.hbs'],
};

const target = {
  css: './static/css',
  js: './static/scripts',
};

function cssStatic() {
  return gulp.src(source.css).pipe(gulp.dest(target.css));
}

function cssStaticMinify() {
  return gulp.src(source.css).pipe(csso()).pipe(gulp.dest(target.css));
}

function format() {
  return gulp.src(source.lint, { base: './' }).pipe(prettier()).pipe(gulp.dest('./'));
}

function jsCopy() {
  return gulp.src(source.js.copy).pipe(gulp.dest(target.js));
}

function jsMinify() {
  return gulp.src(source.js.minify).pipe(uglify()).pipe(gulp.dest(target.js));
}

function lessBuild() {
  return gulp.src(source.less).pipe(less()).pipe(gulp.dest(target.css));
}

function lessMinify() {
  return gulp.src(source.less).pipe(less()).pipe(csso()).pipe(gulp.dest(target.css));
}

function lint() {
  return gulp.src(source.lint).pipe(eslint()).pipe(eslint.formatEach()).pipe(eslint.failOnError());
}

function jasmine() {
  let gulpJasmine;
  const reporter = new ConsoleReporter({
    beep: false,
    verbosity: {
      disabled: false,
      pending: false,
      specs: false,
      summary: true,
    },
  });

  gulpJasmine = require('gulp-jasmine')({
    config: {
      helpers: source.helpers,
      random: false,
    },
    reporter,
  });

  return gulp.src(source.tests).pipe(gulpJasmine);
}

exports.format = format;
exports.jasmine = jasmine;
exports['js-copy'] = jsCopy;
exports['js-minify'] = jsMinify;
exports.lint = lint;

exports.css = gulp.parallel(cssStatic, lessBuild);
exports['css-minify'] = gulp.parallel(cssStaticMinify, lessMinify);
exports.js = gulp.series(exports['js-copy'], exports['js-minify']);
exports.build = gulp.parallel(exports['css-minify'], exports.js);
exports.default = gulp.series(exports.lint, exports.jasmine);
exports.dev = gulp.parallel(exports.css, exports.js);
exports.test = exports.default;
