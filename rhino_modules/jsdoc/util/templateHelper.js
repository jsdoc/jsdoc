/**
 * @module jsdoc/util/templateHelper
 */

var hash = require('pajhome/hash');
var dictionary = require('jsdoc/tag/dictionary');

exports.globalName = 'global';
exports.fileExtension = '.html';

/** Find symbol {@link ...} and {@tutorial ...} strings in text and turn into html links */
exports.resolveLinks = function(str) {
    str = str.replace(/(?:\[(.+?)\])?\{@link +(.+?)\}/gi,
        function(match, content, longname) {
            return toLink(longname, content);
        }
    );

    str = str.replace(/(?:\[(.+?)\])?\{@tutorial +(.+?)\}/gi,
        function(match, content, tutorial) {
            return toTutorial(tutorial, content);
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
        
        url = filename + exports.fileExtension + '#' + getNamespace(doclet.kind) + doclet.name;
    }
    else {
        var longname = doclet.longname,
            filename = strToFilename(longname); // TODO handle name collisions
        
        url = filename + exports.fileExtension;
    }
    
    return url;
}

function getNamespace(kind) {
    if (dictionary.isNamespace(kind)) {
        return kind+':';
    }
    return '';
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
        
        // Has link text been specified {@link http://github.com|GitHub Website}
        var split = url.indexOf('|');
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

/** @external {jsdoc.tutorial.Tutorial} */
var tutorials;

/** Sets tutorials map.
    @param {jsdoc.tutorial.Tutorial} root - Root tutorial node.
 */
exports.setTutorials = function(root) {
    tutorials = root;
};

exports.toTutorial = toTutorial = function(tutorial, content) {
    if (!tutorial) {
        throw new Error('Missing required parameter: tutorial');
    }

    var node = tutorials.getByName(tutorial);
    // no such tutorial
    if (!node) {
        return '<em class="disabled">Tutorial: '+tutorial+'</em>';
    }

    content = content || node.title;

    return '<a href="'+exports.tutorialToUrl(tutorial)+'">'+content+'</a>';
}

exports.longnameToUrl = linkMap.longnameToUrl;

exports.tutorialToUrl = function(tutorial) {
    var node = tutorials.getByName(tutorial);
    // no such tutorial
    if (!node) {
        throw new Error('No such tutorial: '+tutorial);
    }

    return 'tutorial-'+strToFilename(node.name)+exports.fileExtension;
};
