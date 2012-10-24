/*global app: true, beforeEach: true, describe: true, env: true, expect: true, it: true */
var async = require('async'),
    fs = require('fs'),
    path = require('path');

var config = JSON.parse( fs.readFileSync( path.join(env.dirname, '.jshintrc'), 'utf-8' ) );

var jshintErrors;

function jsHintCheck(filename, callback) {
    var JSHINT = require('jshint').JSHINT;

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            callback(err);
        } else {
            JSHINT(data, config);
            if (JSHINT.errors.length) {
                jshintErrors += filename + ' is not JSHint clean: ' + JSON.stringify(JSHINT.errors);
            }

            callback();
        }
    });
}

describe('jshint-clean', function() {
    beforeEach(function() {
        jshintErrors = undefined;
    });

    it('should generate JSHint errors for bad code', function(done) {
        var file = path.join(env.dirname, 'test', 'fixtures', 'jshint', 'badfile.js');
        jsHintCheck(file, function(err) {
            expect(err).toBeUndefined();
            expect(jshintErrors).toBeDefined();
            done();
        });
    });
    
    it('should not generate JSHint errors for good code', function(done) {
        var file = path.join(env.dirname, 'test', 'fixtures', 'jshint', 'goodfile.js');
        jsHintCheck(file, function(err) {
            expect(err).toBeUndefined();
            expect(jshintErrors).toBeUndefined();
            done();
        });
    });
    
    it('should not find JSHint errors in JSDoc', function(done) {
        var check,
            files,
            filter,
            source,
            i,
            l;

        // check all .js files unless they're tests; rhino shim files that probably can't be
        // delinted; or third-party modules
        source = {
            includePattern: '.+[\\|/]rhino_modules[\\|/].+\\.js$|.+[\\|/]plugins[\\|/]\\w+\\.js$',
            excludePattern: '.+[\\|/]test[\\|/].+'
        };
        filter = new (require('jsdoc/src/filter').Filter)(source);

        files = app.jsdoc.scanner.scan([env.dirname], 10, filter);

        async.forEach(files, jsHintCheck, done);
    });
});