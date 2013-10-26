/*global env: true */
var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var runtime = require('jsdoc/util/runtime');
var wrench = require('wrench');

var specs = [];

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

function shouldLoad(file, matcher) {
    var skipPath = runtime.isRhino() ? runtime.NODE : runtime.RHINO;
    try {
        return fs.statSync(file).isFile() && matcher.test( path.basename(file) ) &&
            file.indexOf(skipPath) === -1;
    }
    catch(e) {
        return false;
    }
}

exports.load = function(loadpath, matcher, clear) {
    if (clear === true) {
        clearSpecs();
    }

    var wannaBeSpecs = wrench.readdirSyncRecursive(loadpath);
    for (var i = 0; i < wannaBeSpecs.length; i++) {
        var file = path.join(loadpath, wannaBeSpecs[i]);
        if ( shouldLoad(file, matcher) ) {
            specs.push( createSpecObj(file) );
        }
    }
};

exports.getSpecs = function() {
    return specs;
};
