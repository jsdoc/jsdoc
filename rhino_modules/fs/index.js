
module.exports = {
    readFileSync: function(filename, encoding, callback) {
        if (typeof arguments[1] === 'function') {
            encoding = null;
            callback = arguments[1];
        }
        
        encoding = encoding || java.lang.System.getProperty('file.encoding');
        
        try {
            var content = new java.util.Scanner(
                new java.io.File(filename),
                encoding
            ).useDelimiter("\\Z");
            
            return String( content.next() );
        }
        catch (e) {
            throw('Cannot read module file '+filename);
        }
    
    },
    readdirSync: function(path) {
        var dir = new java.io.File(path);
        if (!dir.directory) { return [String(dir)]; }
        var files = dir.list();
        return files;
    },
    
    ls: function(dir, recurse, _allFiles, _path) {
        var files,
            file;

        if (typeof _path === 'undefined') { // initially
            _allFiles = [];
            _path = [dir];
        }
        
        if (_path.length === 0) { return _allFiles; }
        if (typeof recurse === 'undefined') { recurse = 1; }
        
        files = this.readdirSync(dir);
        
        for (var f = 0, lenf = files.length; f < lenf; f++) {
            file = String(files[f]);
        
            if (file.match(/^\.[^\.\/\\]/)) { continue; } // skip dot files
    
            if ((new java.io.File(_path.join('/') + '/' + file)).list()) { // it's a directory
                _path.push(file);

                if (_path.length - 1 < recurse) {
                    exports.ls(_path.join('/'), recurse, _allFiles, _path);
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
};