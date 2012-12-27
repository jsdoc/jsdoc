/*global app: true, beforeEach: true, describe: true, env: true, expect: true, it: true */
var async = require('async'),
    fs = require('jsdoc/fs'),
    path = require('path');

var config = JSON.parse( fs.readFileSync( path.join(__dirname, '.jshintrc'), 'utf8' ) );

function jsHintCheck(filename, callback) {
    var JSHINT = require('jshint').JSHINT;
    var jsHintErrors;

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            callback(err);
        } else {
            JSHINT(data, config);
            if (JSHINT.errors.length) {
                jsHintErrors = filename + ' is not JSHint clean: ' + JSON.stringify(JSHINT.errors);
            }

            callback(null, jsHintErrors);
        }
    });
}

describe('jshint-clean', function() {
    it('should generate JSHint errors for bad code', function(done) {
        var file = path.join(__dirname, 'test', 'fixtures', 'jshint', 'badfile.js');

        jsHintCheck(file, function(err, jsHintErrors) {
            expect(err).toBeFalsy();
            expect(jsHintErrors).toBeDefined();
            done();
        });
    });
    
    it('should not generate JSHint errors for good code', function(done) {
        var file = path.join(__dirname, 'test', 'fixtures', 'jshint', 'goodfile.js');

        jsHintCheck(file, function(err, jsHintErrors) {
            expect(err).toBeFalsy();
            expect(jsHintErrors).toBeUndefined();
            done();
        });
    });
    
    it('should not find JSHint errors in JSDoc', function(done) {
        var files,
            filter,
            source;

        // check all .js files unless they're tests; rhino shim files that probably can't be
        // delinted; or third-party modules
        source = {
            includePattern: '.+[\\|/]lib[\\|/].+\\.js$|.+[\\|/]plugins[\\|/]\\w+\\.js$',
            excludePattern: '.+[\\|/]test[\\|/].+|.+[\\|/]node_modules[\\|/].+|.+[\\|/]Jake[\\|/].+'
        };
        filter = new (require('jsdoc/src/filter').Filter)(source);

        files = app.jsdoc.scanner.scan([__dirname], 10, filter);

        async.forEach(files, function(file, cb) {
            jsHintCheck(file, function(err, jsHintErrors) {
                expect(jsHintErrors).toBeUndefined();
                cb(err);
            });
        }, function(err) {
            expect(err).toBeFalsy();
            done();
        });
    });
});