/**
 * @module jsdoc/util/templateHelper
 */

/** Find symbol {@link ...} strings in text and turn into html links */
exports.resolveLinks = function(str) {
    str = str.replace(/(?:\[(.+?)\])?\{@link +(.+?)\}/gi,
        function(match, content, longname) {
            return toLink(longname, content);
        }
    );

    return str;
}

exports.registerLink = function(longname, url) {
    linkMap.longnameToUrl[longname] = url;
}

var linkMap = {
    longnameToUrl: {}
};

function toLink(longname, content) {
    if (!longname) {
        throw new Error('Missing required parameter: url');
    }
    content = content || longname;
    
    var url = linkMap.longnameToUrl[longname];
    
    if (!url) {
        return content;
    }
    else {
        return '<a href="'+url+'">'+content+'</a>';
    }
}