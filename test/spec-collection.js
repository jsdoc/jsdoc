/*global env: true */
var wrench = require('wrench');
var path = require('path');
var fs = require('jsdoc/fs');
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

exports.load = function(loadpath, matcher, clear) {
    if (clear === true) {
        clearSpecs();
    }

    var wannaBeSpecs = wrench.readdirSyncRecursive(loadpath);
    for (var i = 0; i < wannaBeSpecs.length; i++) {
        var file = path.join(__dirname, loadpath, wannaBeSpecs[i]);
        try {
            if (fs.statSync(file).isFile()) {
                if (matcher.test(path.basename(file))) {
                    specs.push(createSpecObj(file));
                }
            }
        } catch(e) {
            // nothing to do here
        }
    }
};

exports.getSpecs = function() {
    return specs;
};
