/*global env: true */
var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var runtime = require('jsdoc/util/runtime');
var wrench = require('wrench');

var specs = [];
var finalSpecs = [];

var createSpecObj = function(_path, root) {
    function relativePath() {
        return _path.replace(root, '').replace(/^[\/\\]/, '').replace(/\\/g, '/');
    }

    return {
        path: function() {
            return _path;
        },
        relativePath: relativePath,
        directory: function() {
            return _path.replace(/[\/\\][\s\w\.\-]*$/, "").replace(/\\/g, '/');
        },
        relativeDirectory: function() {
            return relativePath().replace(/[\/\\][\s\w\.\-]*$/, "").replace(/\\/g, '/');
        },
        filename: function() {
            return _path.replace(/^.*[\\\/]/, '');
        }
    };
};

var clearSpecs = exports.clearSpecs = function() {
    specs.splice(0, specs.length);
};

function addSpec(file, target) {
    target = target || specs;

    target.push( createSpecObj(file) );
}

function isValidSpec(file, matcher) {
    var result;

    var skipPath = runtime.isRhino() ? runtime.NODE : runtime.RHINO;

    // valid specs must...
    try {
        // ...be a file
        result = fs.statSync(file).isFile() &&
            // ...match the matcher
            matcher.test( path.basename(file) ) &&
            // ...be relevant to the current runtime
            file.indexOf(skipPath) === -1;
    }
    catch(e) {
        result = false;
    }

    return result;
}

function shouldLoad(file, matcher) {
    var result = false;

    // should this spec run at the end?
    if ( /schema\.js$/.test(file) && isValidSpec(file, matcher) ) {
        addSpec(file, finalSpecs);
    }
    else {
        result = isValidSpec(file, matcher);
    }

    return result;
}

exports.load = function(loadpath, matcher, clear) {
    if (clear === true) {
        clearSpecs();
    }

    var wannaBeSpecs = wrench.readdirSyncRecursive(loadpath);
    for (var i = 0; i < wannaBeSpecs.length; i++) {
        var file = path.join(loadpath, wannaBeSpecs[i]);
        if ( shouldLoad(file, matcher) ) {
            addSpec(file);
        }
    }
};

exports.getSpecs = function() {
    return specs.concat(finalSpecs);
};
