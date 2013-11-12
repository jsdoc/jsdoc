/*global env: true, Packages: true */

/**
 * Partial Rhino shim for Node.js' `fs` module.
 * @see http://nodejs.org/api/fs.html
 */
'use strict';

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

exports.readFileSync = function(filename, encoding) {
    encoding = checkEncoding(encoding, 'fs.readFile[Sync]');

    return readFile(filename, encoding);
};
exports.readFile = asyncify(exports.readFileSync);

// in node 0.8, path.exists() and path.existsSync() moved to the "fs" module
exports.existsSync = path.existsSync;
exports.exists = path.exists;

var statSync = exports.statSync = function(_path) {
    var f = new java.io.File(_path);
    if (!f) {
        throw errorFactory(_path);
    }

    return {
        isFile: function() {
            return f.isFile();
        },
        isDirectory: function() {
            return f.isDirectory();
        }
    };
};
exports.stat = asyncify(statSync);

var readdirSync = exports.readdirSync = function(_path) {
    var dir;
    var files;

    dir = new java.io.File(_path);
    if (!dir.directory) {
        throw errorFactory(_path);
    }

    files = dir.list();

    // Convert files to Javascript strings so they play nice with node modules
    files = files.map(function(fileName) {
        return String(fileName);
    });

    return files;
};
exports.readdir = asyncify(readdirSync);

// JSDoc extension to `fs` module
var toDir = exports.toDir = function(_path) {
    var f = new java.io.File( path.resolve(env.pwd, _path) );

    if (f.isDirectory()){
       return _path;
    } else {
        return path.dirname(_path);
    }
};

var mkdirSync = exports.mkdirSync = function(_path) {
    var dir_path = toDir(_path);
    (new java.io.File(dir_path)).mkdir();
};
exports.mkdir = asyncify(mkdirSync);

// JSDoc extension to `fs` module
exports.mkPath = function(_path) {
    if ( Array.isArray(_path) ) {
        _path = _path.join('');
    }

    ( new java.io.File(path.resolve(env.pwd, _path)) ).mkdirs();
};

// JSDoc extension to `fs` module
exports.copyFileSync = function(inFile, outDir, fileName) {
    if (fileName == null){fileName = path.basename(inFile);}

    outDir = toDir(outDir);

    inFile = new java.io.File(inFile);
    var outFile = new java.io.File(outDir+'/'+fileName);

    var bis = new Packages.java.io.BufferedInputStream(new Packages.java.io.FileInputStream(inFile), 4096);
    var bos = new Packages.java.io.BufferedOutputStream(new Packages.java.io.FileOutputStream(outFile), 4096);
    var theChar;
    while ((theChar = bis.read()) != -1) {
        bos.write(theChar);
    }
    bos.close();
    bis.close();
};
exports.copyFile = asyncify(exports.copyFileSync);

exports.writeFileSync = function(filename, data, encoding) {
    encoding = checkEncoding(encoding, 'fs.writeFile[Sync]');

    var out = new Packages.java.io.PrintWriter(
        new Packages.java.io.OutputStreamWriter(
            new Packages.java.io.FileOutputStream(filename),
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
