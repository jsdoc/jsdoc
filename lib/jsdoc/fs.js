/**
 * Extended version of the standard `fs` module.
 * @module jsdoc/fs
 */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const ls = exports.ls = (dir, recurse, _allFiles, _path) => {
    let file;
    let files;
    let isFile;

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

    for (let i = 0, l = files.length; i < l; i++) {
        file = String(files[i]);

        // skip dot files
        if (file.match(/^\.[^./\\]/)) {
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

exports.toDir = _path => {
    let isDirectory;

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

exports.mkPath = _path => {
    if ( Array.isArray(_path) ) {
        _path = _path.join('');
    }

    mkdirp.sync(_path);
};

exports.copyFileSync = (inFile, outDir = '', fileName) => {
    fileName = fileName || path.basename(inFile);

    fs.copyFileSync(inFile, path.join(outDir, fileName));
};

const alwaysOverride = {
    'copyFileSync': true
};

Object.keys(fs).forEach(member => {
    if (!alwaysOverride[member]) {
        exports[member] = fs[member];
    }
});

