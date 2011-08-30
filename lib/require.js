/*
    Rhino-Require is Public Domain
    <http://en.wikipedia.org/wiki/Public_Domain>
    
    The author or authors of this code dedicate any and all copyright interest
    in this code to the public domain. We make this dedication for the benefit
    of the public at large and to the detriment of our heirs and successors. We
    intend this dedication to be an overt act of relinquishment in perpetuity of
    all present and future rights to this code under copyright law.
 */

(function(global) {

    var require = global.require = function(id) {
        if (typeof arguments[0] !== 'string') throw 'USAGE: require(moduleId)';
        
        var moduleContent = '',
            moduleUrl;
        
        moduleUrl = require.resolve(id);
        moduleContent = '';

        var file = new java.io.File(moduleUrl);
        try {    
            var scanner = new java.util.Scanner(file).useDelimiter("\\Z");
            moduleContent = String( scanner.next() );
        }
        catch(e) {
            throw 'Unable to read file at: '+moduleUrl+', '+e;
        }
        
        if (moduleContent) {
                try {
                    var f = new Function('require', 'exports', 'module', '__dirname', moduleContent),
                    exports = require.cache[moduleUrl] || {},
                    module = { id: id, uri: moduleUrl, exports: exports };
        
                    require._root.unshift(toDir(moduleUrl));
                    (function(__dirname) {
                    
                        /*debug*///var lineno=1;print('\n== '+moduleUrl+' ===============\n1'+moduleContent.replace(/(\n)/g, function(m, i){return '\n'+(++lineno);}));
                        f.call({}, require, exports, module, __dirname);
                    })(require._root[0]);
                    require._root.shift();
                }
                catch(e) {
                    throw 'Unable to require source code from "' + moduleUrl + '": ' + e.toSource();
                }
                
                exports = module.exports || exports;
                require.cache[id] = exports;
        }
        else {
            throw 'The requested module cannot be returned: no content for id: "' + id + '" in paths: ' + require.paths.join(', ');
        }
        
        return exports;
    }
    require._root = [__dirname]; // the dir of the script that is calling require()
    require.paths = [];
    require.cache = {}; // cache module exports. Like: {id: exported}
    
    var SLASH = Packages.java.io.File.separator;
    
    /** Given a module id, try to find the path to the associated module.
     */
    require.resolve = function(id) {
        var parts = id.match(/^(\.\/|\/)?(.+)$/),
            isRelative = false,
            isAbsolute = false,
            isInModule = false,
            basename = id,
            url = '';
        
        if (parts) {
            isRelative = parts[1] === './';
            isAbsolute = parts[1] === '/';
            isInModule = !(isRelative || isAbsolute);
            basename = parts[2];
        }
        
        if (typeof basename === 'undefined') {
            throw new Error('Malformed module identifier: '+id);
        }
            
        if (isAbsolute) {
            rootedId = id;
        }
        else if (isRelative) {
            var root = require._root[0],
                rootedId = root + '/' + basename;
        }
        
        if (rootedId) {
            if ( url = loadAsFile(rootedId) ) { return url; }
            else if ( url = loadAsDir(rootedId) ) { return url; }
        }
        else if (isInModule) {
            var url,
                paths = require.paths;
                
            for (var i = 0, len = paths.length; i < len; i++) {
                rootedId = paths[i] + '/' + basename;

                if ( url = loadAsFile(rootedId) ) { return url; }
                else if ( url = loadAsDir(rootedId) ) { return url; }
            }
            if (url = findInNodemodules(require._root[0], basename, 'rhino_modules')) { return url; }
            if (url = findInNodemodules(require._root[0], basename, 'node_modules')) { return url; }
        }
        
        throw new Error('Module not found: '+id);
    }
    
    function loadAsFile(id) {
        if ( isFile(id) ) { return id; }
        
        if ( isFile(id + '.js') ) { return id + '.js'; }
    }
    
    function loadAsDir(id) {
        // look for the "main" property of the package.json file
        if ( isFile(id + '/' + 'package.json') ) {
            var packageJson = readFileSync(id + '/' + 'package.json', 'utf-8');
            eval( 'packageJson = '+ packageJson);
            if (packageJson.hasOwnProperty('main')) {
                var main = deDotPath(id + '/' + packageJson.main);
                return require.resolve(main);
            }
        }
        
        if ( isFile(id + '/' + 'index.js') ) {
            return id + '/' + 'index.js';
        }
    }
    
    function findInNodemodules(root, id, moduleFolderName) {
        var dirs = root.split('/'),
            dir = '',
            rootedId;
        
        while (dirs.length) {
            dir = dirs.join('/');
            rootedId = dir + '/' + moduleFolderName + '/' + id;
            
            if ( url = loadAsFile(rootedId) ) { return url; }
            else if ( url = loadAsDir(rootedId) ) { return url; }
        
            dirs.pop();
        }
    }

    /** Given a path, return the base directory of that path.
        @example toDir('/foo/bar/somefile.js'); => '/foo/bar'
     */
    function toDir(path) {
        var file = new java.io.File(path);
        
        if (file.isDirectory()) {
			return path;
        }
        
        var parts = path.split('/');
        parts.pop();
        return parts.join('/');
    }
    
    /** Returns true if the given path exists and is a file.
     */
    function isFile(path) {
        var file = new java.io.File(path);
        
        if (file.isFile()) {
           return true;
        }
        
        return false;
    }
    
    /** Returns true if the given path exists and is a directory.
     */
    function isDir(path) {
        var file = new java.io.File(path);
        
        if (file.isDirectory()) {
           return true;
        }
        
        return false;
    }
    
    /**
        Resolve dots in filepaths.
     */
    function deDotPath(path) {
        return String(path)
			.replace(/(\/|\\)[^\/\\]+\/\.\.(\/|\\)/g, '/')
			.replace(/(\/|\\)\.(\/|\\|$)/g, '/');
    }

    function readFileSync(filename, encoding, callback) {
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
            return '';
        }
    }

})(this);