/**
 * Partial Rhino shim for Node.js' `fs` module.
 * @see http://nodejs.org/api/fs.html
 */
'use strict';

var env = require('jsdoc/env');
var path = require('path');
var util = require('util');

var asyncify = path._asyncify;

function checkEncoding(enc, name) {
    // we require the `encoding` parameter for Node.js compatibility; on Node.js, if you omit the
    // encoding, you get a stream instead of a string
    if (!enc || typeof enc === 'function') {
        throw new Error(name + ' requires an encoding on Rhino!');
    }

    // Node.js wants 'utf8', but Java wants 'utf-8'
    if (enc === 'utf8') {
        enc = 'utf-8';
    }

    return enc;
}

// provide an error that's consistent with Node.js
function errorFactory(filepath) {
    return new Error( util.format("ENOENT, no such file or directory '%s'", filepath) );
}

exports.readFileSync = function readFileSync(filename, encoding) {
    encoding = checkEncoding(encoding, 'fs.readFile[Sync]');

    return readFile(filename, encoding);
};
exports.readFile = asyncify(exports.readFileSync);

// in node 0.8, path.exists() and path.existsSync() moved to the "fs" module
exports.existsSync = path.existsSync;
exports.exists = path.exists;

var statSync = exports.statSync = function statSync(_path) {
    var f = new java.io.File(_path);
    if (!f) {
        throw errorFactory(_path);
    }

    return {
        isFile: function isFile() {
            return f.isFile();
        },
        isDirectory: function isDirectory() {
            return f.isDirectory();
        },
        isSymlink: function isSymlink() {
            // java.io.File resolves symlinks
            return false;
        }
    };
};
exports.stat = asyncify(statSync);

// java.io.File resolves symlinks, so we can alias `lstat` to `stat`
var lstatSync = exports.lstatSync = statSync;
exports.lstat = asyncify(lstatSync);

var readdirSync = exports.readdirSync = function readdirSync(_path) {
    var dir;
    var files;

    dir = new java.io.File(_path);
    if (!dir.directory) {
        throw errorFactory(_path);
    }

    files = dir.list()
        .map(function(fileName) {
            return String(fileName);
        });

    return files;
};
exports.readdir = asyncify(readdirSync);

// JSDoc extension to `fs` module
var toDir = exports.toDir = function toDir(_path) {
    var f;

    _path = path.normalize(_path);
    f = new java.io.File( path.resolve(env.pwd, _path) );

    if ( f.isDirectory() ){
       return _path;
    } else {
        return path.dirname(_path);
    }
};

var mkdirSync = exports.mkdirSync = function mkdirSync(_path) {
    var dir_path = toDir(_path);
    ( new java.io.File(dir_path) ).mkdir();
};
exports.mkdir = asyncify(mkdirSync);

// JSDoc extension to `fs` module
exports.mkPath = function mkPath(_path) {
    if ( Array.isArray(_path) ) {
        _path = _path.join('');
    }

    ( new java.io.File(path.resolve(env.pwd, _path)) ).mkdirs();
};

// JSDoc extension to `fs` module
exports.copyFileSync = function copyFileSync(inFile, outDir, fileName) {
    if (fileName === undefined || fileName === null) {
        fileName = path.basename(inFile);
    }

    outDir = toDir(outDir);

    inFile = new java.io.File(inFile);
    var outFile = new java.io.File(outDir + '/' + fileName);

    var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(inFile), 4096);
    var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(outFile), 4096);
    var theChar = bis.read();
    while (theChar !== -1) {
        bos.write(theChar);
        theChar = bis.read();
    }

    bos.close();
    bis.close();
};
exports.copyFile = asyncify(exports.copyFileSync);

exports.writeFileSync = function writeFileSync(filename, data, encoding) {
    encoding = checkEncoding(encoding, 'fs.writeFile[Sync]');

    var out = new java.io.PrintWriter(
        new java.io.OutputStreamWriter(
            new java.io.FileOutputStream(filename),
            encoding
        )
    );

    try {
        out.write(data);
    }
    finally {
        out.flush();
        out.close();
    }
};
exports.writeFile = asyncify(exports.writeFileSync);

exports.rmdirSync = function rmdirSync(_path) {
    throw new Error('not implemented');
};
exports.rmdir = asyncify(exports.rmdirSync);

exports.unlinkSync = function unlinkSync(_path) {
    throw new Error('not implemented');
};
exports.unlink = asyncify(exports.unlinkSync);
