function readFileSync(filename, encoding, callback) {
    if (typeof arguments[1] === 'function') {
        encoding = null;
        callback = arguments[1];
    }
    
    // TODO: support other encodings
    var lines = [],
        reader,
        input,
        s;
    
    // see http://download.oracle.com/javase/1,5.0/docs/api/java/nio/charset/Charset.html
    try {
        reader = new java.io.InputStreamReader(new java.io.FileInputStream(filename), 'UTF-8');
        input = new java.io.BufferedReader(reader);
        
        while( (s = input.readLine()) != null) {
            lines.push( new java.lang.String(s.getBytes('UTF-8')) );
        }
        
        return lines.join('\n');
    }
    catch (e) {
        throw('Cannot read module file '+filename+', '+e);
    }
}

function readdirSync(path) {
    var dir,
        files;
    
    dir = new java.io.File(path);
    if (!dir.directory) { return [String(dir)]; }
    
    files = dir.list();
    
    return files;
}

function ls(dir, recurse, _allFiles, _path) {
    var files,
        file;

    if (typeof _path === 'undefined') { // initially
        _allFiles = [];
        _path = [dir];
    }
    
    if (_path.length === 0) { return _allFiles; }
    if (typeof recurse === 'undefined') { recurse = 1; }
    
    if ( stat(dir).isFile(dir) ) {
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
                (_path.join('/') + '/' + file).replace(/[\/\\]+/g, '/')
            );
        }
    }

    return _allFiles;
}

function stat(path, encoding) {
    var f = new java.io.File(path)
    return {
        isFile: function() {
            return f.isFile();
        },
        isDir: function() {
            return f.isDirectory();
        }
    }

}

function mkPath(/**Array*/ path) {
    if (path.constructor != Array) path = path.split(/[\\\/]/);
    var make = "";
    for (var i = 0, l = path.length; i < l; i++) {
        make += path[i] + '/';
        if (! exists(make)) {
            makeDir(make);
        }
    }
}

function makeDir(/**string*/ path) {
    var dirPath = toDir(path);
    (new java.io.File(dirPath)).mkdir();
}

function exists(path) {
    var f = new java.io.File(path);

    if (f.isDirectory()){
        return true;
    }
    if (!f.exists()){
        return false;
    }
    if (!f.canRead()){
        return false;
    }
    return true;
}

function toDir(path) {
    var f = new java.io.File(path);
    
    if (f.isDirectory()){
       return path;
    }
    
    var parts = path.split(/[\\\/]/);
    parts.pop();
    
    return parts.join('/');
}

function copyFile(inFile, outDir, fileName) {
    if (fileName == null) fileName = toFile(inFile);
    
    outDir = toDir(outDir);
    
    var inFile = new java.io.File(inFile);
    var outFile = new java.io.File(outDir+'/'+fileName);
    
    var bis = new Packages.java.io.BufferedInputStream(new Packages.java.io.FileInputStream(inFile), 4096);
    var bos = new Packages.java.io.BufferedOutputStream(new Packages.java.io.FileOutputStream(outFile), 4096);
    var theChar;
    while ((theChar = bis.read()) != -1) {
            bos.write(theChar);
    }
    bos.close();
    bis.close();
}

function toFile(path) {
    var parts = path.split(/[\\\/]/);
    return parts.pop();
}

function write(path, content, encoding) {
    var output = new java.io.BufferedWriter(new java.io.FileWriter(path));
    
    try {
      //FileWriter always assumes default encoding is OK!
      output.write( content );
    }
    finally {
      output.close();
    }
}

module.exports = {
    readFileSync: readFileSync,
    readdirSync: readdirSync,
    stat: stat,
    
    ls: ls,
    mkPath: mkPath,
    toDir: toDir,
    copyFile: copyFile,
    write: write
};