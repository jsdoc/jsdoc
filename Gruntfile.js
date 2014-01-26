'use strict';

var os = require('os');
var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodeBin: path.resolve(__dirname, './jsdoc.js'),
        nodePath: process.execPath,
        rhinoBin: (function() {
            var filepath = path.resolve(__dirname, './jsdoc');

            if (os.platform().indexOf('win') === 0) {
                filepath += '.cmd';
            }

            return filepath;
        })(),

        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            setters: {
                date: function(oldDate, releaseType, options) {
                    return oldDate;
                },
                version: function(oldVersion, releaseType, options) {
                    return oldVersion;
                },
                revision: function(oldVersion, releaseType, options) {
                    return String( Date.now() );
                }
            },
            files: ['package.json']
        },
        jshint: {
            all: [
                '*.js',
                'lib/**/*.js',
                'plugins/**/*.js',
                'templates/**/*.js'
            ],
            options: {
                ignores: ['templates/default/static/scripts/prettify/*'],
                jshintrc: '.jshintrc'
            }
        },
        shell: {
            'coverage': {
                command: './node_modules/.bin/istanbul cover <%= nodeBin %> -- -T',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'test-rhino': {
                command: '<%= rhinoBin %> -T -q "parser=rhino"',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'test-rhino-esprima': {
                command: '<%= rhinoBin %> -T -q "parser=esprima"',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'test-node': {
                command: '<%= nodePath %> <%= nodeBin %> -T',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.renameTask('bumpup', 'bump');

    grunt.registerTask('coverage', ['shell:coverage']);

    grunt.registerTask('test-rhino', ['shell:test-rhino']);
    grunt.registerTask('test-rhino-esprima', ['shell:test-rhino-esprima']);
    grunt.registerTask('test-node', ['shell:test-node']);
    grunt.registerTask('test', ['test-rhino', 'test-rhino-esprima', 'test-node', 'jshint']);

    grunt.registerTask('default', ['test']);
};
