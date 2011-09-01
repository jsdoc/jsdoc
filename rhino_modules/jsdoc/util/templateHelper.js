/**
 * @module jsdoc/util/templateHelper
 */

var hash = require('pajhome/hash');
exports.globalName = 'global';
exports.fileExtension = '.html';

/** Find symbol {@link ...} strings in text and turn into html links */
exports.resolveLinks = function(str) {
    str = str.replace(/(?:\[(.+?)\])?\{@link +(.+?)\}/gi,
        function(match, content, longname) {
            return toLink(longname, content);
        }
    );

    return str;
}

// two-way lookup
var linkMap = {
    longnameToUrl: {},
    urlToLongname: {}
};

exports.registerLink = function(longname, url) {
    linkMap.longnameToUrl[longname] = url;
    linkMap.urlToLongname[url] = longname;
}

// each container gets its own html file
var containers = ['class', 'module', 'external', 'namespace', 'mixin'];

/** Turn a doclet into a URL. */
exports.createLink = function(doclet) {
    var url = '';
    
    if (containers.indexOf(doclet.kind) < 0) {
        var longname = doclet.longname,
            filename = strToFilename(doclet.memberof || exports.globalName); // TODO handle name collisions
        
        url = filename + exports.fileExtension + '#' + doclet.name;
    }
    else {
        var longname = doclet.longname,
            filename = strToFilename(longname); // TODO handle name collisions
        
        url = filename + exports.fileExtension;
    }
    
    return url;
}

function strToFilename(str) {
    if ( /[^$a-z0-9._-]/i.test(str) ) {
        return hash.hex_md5(str).substr(0, 10);
    }
    return str;
}

function makeFilenameUnique(filename) {
    return filename;
}

function toLink(longname, content) {
    if (!longname) {
        throw new Error('Missing required parameter: url');
    }
    
    // Has link been specified manually?
    var url;
    if (/^(http|ftp)s?:/.test(longname)) {
        url = longname;
        
        // Has link text been specified {@link http://github.com GitHub Website}
        var split = url.indexOf(' ');
        if (split !== -1) {
            content = url.substr(split + 1);
            url = url.substr(0, split);
        }
    }
    else {
	    url = linkMap.longnameToUrl[longname];
	}
    
    content = content || longname;
    
    if (!url) {
        return content;
    }
    else {
        return '<a href="'+url+'">'+content+'</a>';
    }
}

exports.longnameToUrl = linkMap.longnameToUrl;