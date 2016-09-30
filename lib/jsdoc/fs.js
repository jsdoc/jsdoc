/**
 * Extended version of the standard `fs` module.
 * @module jsdoc/fs
 */
'use strict';

var fs = require('fs');
var path = require('path');
var stream = require('stream');
var mkdirp = require('mkdirp');

var ls = exports.ls = function(dir, recurse, _allFiles, _path) {
    var file;
    var files;
    var isFile;

    // first pass
    if (_path === undefined) {
        _allFiles = [];
        _path = [dir];
    }

    if (!_path.length) {
        return _allFiles;
    }

    if (recurse === undefined) {
        recurse = 1;
    }

    try {
        isFile = fs.statSync(dir).isFile();
    }
    catch (e) {
        isFile = false;
    }
    if (isFile) {
        files = [dir];
    }
    else {
        files = fs.readdirSync(dir);
    }

    for (var i = 0, l = files.length; i < l; i++) {
        file = String(files[i]);

        // skip dot files
        if (file.match(/^\.[^\.\/\\]/)) {
            continue;
        }

        if ( fs.statSync(path.join(_path.join('/'), file)).isDirectory() ) {
            // it's a directory
            _path.push(file);

            if (_path.length - 1 < recurse) {
                ls(_path.join('/'), recurse, _allFiles, _path);
            }
            _path.pop();
        }
        else {
            // it's a file
            _allFiles.push( path.normalize(path.join(_path.join('/'), file)) );
        }
    }

    return _allFiles;
};

var toDir = exports.toDir = function(_path) {
    var isDirectory;

    _path = path.normalize(_path);

    try {
        isDirectory = fs.statSync(_path).isDirectory();
    }
    catch (e) {
        isDirectory = false;
    }

    if (isDirectory) {
       return _path;
    } else {
        return path.dirname(_path);
    }
};

exports.mkPath = function(_path) {
    if ( Array.isArray(_path) ) {
        _path = _path.join('');
    }

    mkdirp.sync(_path);
};

// adapted from http://procbits.com/2011/11/15/synchronous-file-copy-in-node-js
exports.copyFileSync = function(inFile, outDir, fileName) {
    var BUF_LENGTH = 64 * 1024;

    var read;
    var write;

    var buffer = new Buffer(BUF_LENGTH);
    var bytesRead = 1;
    var outFile = path.join( outDir, fileName || path.basename(inFile) );
    var pos = 0;

    mkdirp.sync(outDir);
    read = fs.openSync(inFile, 'r');
    write = fs.openSync(outFile, 'w');

    while (bytesRead > 0) {
        bytesRead = fs.readSync(read, buffer, 0, BUF_LENGTH, pos);
        fs.writeSync(write, buffer, 0, bytesRead);
        pos += bytesRead;
    }

    fs.closeSync(read);
    return fs.closeSync(write);
};

Object.keys(fs).forEach(function(member) {
    exports[member] = fs[member];
});
