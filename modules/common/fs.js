/**
	@overview File system stuff.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

(function() {
	var slash = java.lang.System.getProperty('file.separator') || '/',
		File = java.io.File,
		defaultEncoding = java.lang.System.getProperty('file.encoding');
	
	exports.read = function(path, encoding) {
		var options = options || {},
			encoding = encoding || defaultEncoding,
			input;
print('encoding is '+encoding);
		input = new java.util.Scanner(
			new File(path),
			encoding
		).useDelimiter("\\Z");
		
		return String( input.next() );
	}
	
	exports.write = function(path, content, encoding) {
		var options = options || {},
			encoding = encoding || defaultEncoding,
			output;
		
		output = new java.io.PrintWriter(
			new java.io.OutputStreamWriter(
				new java.io.FileOutputStream(path),
				encoding
			)
		);
		
		output.write(content);
		output.flush();
		output.close();
	}
	
	/**
	 * Check if a file exists.
	 * @param {string} path The file to check.
	 * @returns {boolean}
	 */
	exports.exists = function(path) {
		var file = new File(path);
	
		if (file.isDirectory()){
			return true;
		}
		if (!file.exists()){
			return false;
		}
		if (!file.canRead()){
			return false;
		}
		return true;
	}
	
	/**
	 * Get a list of all files in a given directory. Will not include files that
	 * start with a dot.
	 * @type string[]
	 * @param {string} dir The starting directory to look in.
	 * @param {number} [recurse=1] How many levels deep to scan.
	 * @returns {string[]} An array of {string} paths to the files in the given directory.
	 */
	exports.ls = function(dir, recurse, _allFiles, _path) {
		var files,
			file;
	
		if (typeof _path === 'undefined') { // initially
			_allFiles = [];
			_path = [dir];
		}
		
		if (_path.length === 0) { return _allFiles; }
		if (typeof recurse === 'undefined') { recurse = 1; }
		
		dir = new File(dir);
		if (!dir.directory) { return [String(dir)]; }
		files = dir.list();
		
		for (var f = 0, lenf = files.length; f < lenf; f++) {
			file = String(files[f]);
		
			if (file.match(/^\.[^\.\/\\]/)) { continue; } // skip dot files
	
			if ((new File(_path.join(slash) + slash + file)).list()) { // it's a directory
				_path.push(file);
				
				if (_path.length - 1 < recurse) {
					exports.ls(_path.join(slash), recurse, _allFiles, _path);
				}
				_path.pop();
			}
			else { // it's a file	
				_allFiles.push(
					fixSlash( (_path.join(slash) + slash + file) )
				);
			}
		}
	
		return _allFiles;
	}
	
	// fix multiple slashes, like one//two
	function fixSlash(path) {
		return path.replace(/[\/\\]+/g, slash);
	}

})();

