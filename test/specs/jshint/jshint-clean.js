/*global app: true, describe: true, env: true, expect: true, it: true */
var fs = require("fs"),
    path = require("path");

var config = JSON.parse( fs.readFileSync( path.join(env.dirname, ".jshintrc"), "utf-8" ) );

function jsHintCheck(filename, source, conf) {
    var JSHINT = require("jshint/jshint").JSHINT;
    source = source || fs.readFileSync(filename, "utf-8");
    conf = conf || config;
    
    JSHINT(source, conf);
    if (JSHINT.errors.length) {
        throw new Error( filename + " is not JSHint clean: " + JSON.stringify(JSHINT.errors) );
    }
}

describe("jshint-clean", function() {
    it("should generate JSHint errors for bad code", function() {
        
        var check = function() {
            jsHintCheck("dummyFile.js", "blah = 0");
        };
        expect(check).toThrow();
    });
    
    it("should not generate any JSHint errors", function() {
        var check,
            files,
            filter,
            source,
            i,
            l;

        // check all .js files unless they're tests; rhino shim files that probably can't be
        // delinted; or third-party modules
        source = {
            includePattern: ".+\\.js$",
            excludePattern: ".+[\\\\|/]test[\\\\|/].+|.+rhino-shim\\.js|.+[\\\\|/]Jake[\\\\|/].+|.+[\\\\|/]node_modules[\\\\|/].+"
        };
        filter = new (require('jsdoc/src/filter').Filter)(source);

        files = app.jsdoc.scanner.scan([env.dirname], 10, filter);
        //console.log("files to lint: " + JSON.stringify(files));

        check = function() {
            jsHintCheck(files[i]);
        };

        for (i = 0, l = files.length; i < l; i++) {
            //console.log("about to lint " + files[i]);
            expect(check).not.toThrow();
        }
    });
});
