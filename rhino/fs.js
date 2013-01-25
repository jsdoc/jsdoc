/*global Packages: true */

/**
 * Partial Rhino shim for Node.js' `fs` module.
 * @see http://nodejs.org/api/fs.html
 */

var path = require('path');

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

exports.readFileSync = function(filename, encoding) {
    encoding = checkEncoding(encoding, 'fs.readFileSync');

    return readFile(filename, encoding);
};

exports.readFile = function(filename, encoding, callback) {
    try {
        var data = exports.readFileSync(filename, encoding);
        process.nextTick(function() {
            callback(null, data);
        });
    }
    catch(e) {
        process.nextTick(function() {
            callback(e);
        });
    }
};

// in node 0.8, path.exists() and path.existsSync() moved to the "fs" module
exports.existsSync = path.existsSync;

var statSync = exports.statSync = function(_path) {
    var f = new java.io.File(_path);
    return {
        isFile: function() {
            return f.isFile();
        },
        isDirectory: function() {
            return f.isDirectory();
        }
    };
};

var readdirSync = exports.readdirSync = function(_path) {
    var dir;
    var files;

    dir = new java.io.File(_path);
    if (!dir.directory) {
        throw new Error("ENOENT, no such file or directory '" + _path + "'");
    }

    files = dir.list();

    // Convert files to Javascript strings so they play nice with node modules
    files = files.map(function(fileName) {
        return String(fileName);
    });

    return files;
};

// JSDoc extension to `fs` module
var ls = exports.ls = function(dir, recurse, _allFiles, _path) {
    var files,
        file;

    if (typeof _path === 'undefined') { // initially
        _allFiles = [];
        _path = [dir];
    }

    if (_path.length === 0) { return _allFiles; }
    if (typeof recurse === 'undefined') { recurse = 1; }

    if ( statSync(dir).isFile(dir) ) {
        files = [dir];
    }
    else {
        files = readdirSync(dir);
    }

    for (var f = 0, lenf = files.length; f < lenf; f++) {
        file = String(files[f]);

        if (file.match(/^\.[^\.\/\\]/)) { continue; } // skip dot files

        if ((new java.io.File(_path.join('/') + '/' + file)).list()) { // it's a directory
            _path.push(file);

            if (_path.length - 1 < recurse) {
                ls(_path.join('/'), recurse, _allFiles, _path);
            }
            _path.pop();
        }
        else { // it's a file
            _allFiles.push(
                path.normalize(_path.join('/') + '/' + file)
            );
        }
    }

    return _allFiles;
};

// JSDoc extension to `fs` module
var toDir = exports.toDir = function(_path) {
    var f = new java.io.File(_path);

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

// JSDoc extension to `fs` module
exports.mkPath = function(/**Array*/ _path) {
    if (_path.constructor == Array) { _path = _path.join(''); }

    (new java.io.File(_path)).mkdirs();
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

exports.writeFileSync = function(filename, data, encoding) {
    encoding = checkEncoding(encoding, 'fs.writeFileSync');

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
