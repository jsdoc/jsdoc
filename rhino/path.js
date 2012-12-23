var isWindows = java.lang.System.getProperty("os.name").toLowerCase().contains("windows");
var fileSeparator = exports.sep = String( java.lang.System.getProperty("file.separator") );

/**
 * Returns everything on a path except for the last item
 * e.g. if the path was 'path/to/something', the return value would be 'path/to'
 */
exports.dirname = function(_path) {
    var f = new java.io.File(_path);
    return String(f.getParent());
};

/**
 *  Returns the last item on a path
 */
exports.basename = function(_path, ext) {
    var f = new java.io.File(_path);
    var p = f.getParentFile();
    var base = String(f.getName());
    if (p != null) {
        var idx = ext ? base.indexOf(ext) : -1;
        if (idx !== -1) {
            base = base.substring(0, base.length - ext.length);
        }
    }
    return base;
};

exports.existsSync = function(_path) {
   var f = new java.io.File(_path);

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
};

//Code below taken from node

//resolves . and .. elements in a path array with directory names there
//must be no slashes, empty elements, or device names (c:\) in the array
//(so also no leading and trailing slashes - it does not distinguish
//relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for ( var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last == '.') {
            parts.splice(i, 1);
        } else if (last === '..') {
            parts.splice(i, 1);
            up++;
        } else if (up) {
            parts.splice(i, 1);
            up--;
        }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
        for (; up--; up) {
            parts.unshift('..');
        }
    }

    return parts;
}

if (isWindows) {
    // Regex to split a windows path into three parts: [*, device, slash,
    // tail] windows-only
    var splitDeviceRe =
        /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?([\s\S]*?)$/;

    // path.resolve([from ...], to)
    // windows version
    exports.resolve = function() {
      var resolvedDevice = '',
          resolvedTail = '',
          resolvedAbsolute = false;

      for (var i = arguments.length - 1; i >= -1; i--) {
        var path;
        if (i >= 0) {
          path = arguments[i];
        } else if (!resolvedDevice) {
          path = process.cwd();
        } else {
          // Windows has the concept of drive-specific current working
          // directories. If we've resolved a drive letter but not yet an
          // absolute path, get cwd for that drive. We're sure the device is not
          // an unc path at this points, because unc paths are always absolute.
          path = process.env['=' + resolvedDevice];
          // Verify that a drive-local cwd was found and that it actually points
          // to our drive. If not, default to the drive's root.
          if (!path || path.substr(0, 3).toLowerCase() !==
              resolvedDevice.toLowerCase() + '\\') {
            path = resolvedDevice + '\\';
          }
        }

        // Skip empty and invalid entries
        if (typeof path !== 'string' || !path) {
          continue;
        }

        var result = splitDeviceRe.exec(path),
            device = result[1] || '',
            isUnc = device && device.charAt(1) !== ':',
            isAbsolute = !!result[2] || isUnc, // UNC paths are always absolute
            tail = result[3];

        if (device &&
            resolvedDevice &&
            device.toLowerCase() !== resolvedDevice.toLowerCase()) {
          // This path points to another device so it is not applicable
          continue;
        }

        if (!resolvedDevice) {
          resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
          resolvedTail = tail + '\\' + resolvedTail;
          resolvedAbsolute = isAbsolute;
        }

        if (resolvedDevice && resolvedAbsolute) {
          break;
        }
      }

      // Replace slashes (in UNC share name) by backslashes
      resolvedDevice = resolvedDevice.replace(/\//g, '\\');

      // At this point the path should be resolved to a full absolute path,
      // but handle relative paths to be safe (might happen when process.cwd()
      // fails)

      // Normalize the tail path

      function f(p) {
        return !!p;
      }

      resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/).filter(f),
                                    !resolvedAbsolute).join('\\');

      return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
             '.';
    };

    // windows version
    exports.normalize = function(_path) {
      var result = splitDeviceRe.exec(_path),
          device = result[1] || '',
          isUnc = device && device.charAt(1) !== ':',
          isAbsolute = !!result[2] || isUnc, // UNC paths are always absolute
          tail = result[3],
          trailingSlash = /[\\\/]$/.test(tail);

      // Normalize the tail path
      tail = normalizeArray(tail.split(/[\\\/]+/).filter(function(p) {
        return !!p;
      }), !isAbsolute).join('\\');

      if (!tail && !isAbsolute) {
        tail = '.';
      }
      if (tail && trailingSlash) {
        tail += '\\';
      }

      return device + (isAbsolute ? '\\' : '') + tail;
    };

    //windows version
    exports.join = function() {
      function f(p) {
        return p && typeof p === 'string';
      }

      var _paths = Array.prototype.slice.call(arguments, 0).filter(f);
      var joined = _paths.join('\\');

      // Make sure that the joined path doesn't start with two slashes
      // - it will be mistaken for an unc path by normalize() -
      // unless the _paths[0] also starts with two slashes
      if (/^[\\\/]{2}/.test(joined) && !/^[\\\/]{2}/.test(_paths[0])) {
        joined = joined.slice(1);
      }

      return exports.normalize(joined);
    };

    // path.relative(from, to)
    // it will solve the relative path from 'from' to 'to', for instance:
    // from = 'C:\\orandea\\test\\aaa'
    // to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    // windows version
    exports.relative = function(from, to) {
      from = exports.resolve(from);
      to = exports.resolve(to);

      // windows is not case sensitive
      var lowerFrom = from.toLowerCase();
      var lowerTo = to.toLowerCase();

      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== '') {
            break;
          }
        }

        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== '') {
            break;
          }
        }

        if (start > end) {
          return [];
        }
        return arr.slice(start, end - start + 1);
      }

      var toParts = trim(to.split('\\'));

      var lowerFromParts = trim(lowerFrom.split('\\'));
      var lowerToParts = trim(lowerTo.split('\\'));

      var length = Math.min(lowerFromParts.length, lowerToParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (lowerFromParts[i] !== lowerToParts[i]) {
          samePartsLength = i;
          break;
        }
      }

      if (samePartsLength === 0) {
        return to;
      }

      var outputParts = [];
      for (i = samePartsLength; i < lowerFromParts.length; i++) {
        outputParts.push('..');
      }

      outputParts = outputParts.concat(toParts.slice(samePartsLength));

      return outputParts.join('\\');
    };
} else {
    // path.resolve([from ...], to)
    // posix version
    exports.resolve = function() {
      var resolvedPath = '',
          resolvedAbsolute = false;

      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = (i >= 0) ? arguments[i] : process.cwd();

        // Skip empty and invalid entries
        if (typeof path !== 'string' || !path) {
          continue;
        }

        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = path.charAt(0) === '/';
      }

      // At this point the path should be resolved to a full absolute path, but
      // handle relative paths to be safe (might happen when process.cwd() fails)

      // Normalize the path
      resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
        return !!p;
      }), !resolvedAbsolute).join('/');

      return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
    };

    // path.normalize(_path)
    // posix version
    exports.normalize = function(_path) {
      var isAbsolute = _path.charAt(0) === '/',
          trailingSlash = _path.slice(-1) === '/';

      // Normalize the path
      _path = normalizeArray(_path.split('/').filter(function(p) {
        return !!p;
      }), !isAbsolute).join('/');

      if (!_path && !isAbsolute) {
        _path = '.';
      }
      if (_path && trailingSlash) {
        _path += '/';
      }

      return (isAbsolute ? '/' : '') + _path;
    };

    // posix version
    exports.join = function() {
      var _paths = Array.prototype.slice.call(arguments, 0);
      return exports.normalize(_paths.filter(function(p, index) {
        return p && typeof p === 'string';
      }).join('/'));
    };

    // path.relative(from, to)
    // posix version
    exports.relative = function(from, to) {
      from = exports.resolve(from).substr(1);
      to = exports.resolve(to).substr(1);

      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== '') {
            break;
          }
        }

        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== '') {
            break;
          }
        }

        if (start > end) {
          return [];
        }
        return arr.slice(start, end - start + 1);
      }

      var fromParts = trim(from.split('/'));
      var toParts = trim(to.split('/'));

      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }

      var outputParts = [];
      for (i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
      }

      outputParts = outputParts.concat(toParts.slice(samePartsLength));

      return outputParts.join('/');
    };
}