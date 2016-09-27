/**
 * @overview Generate specification list from source code inline comments.
 * @module plugins/specs
 * @author Uros Jarc <https://github.com/urosjarc>
 */
'use strict';

var path = require('path');
var fs = require('fs');

exports.handlers = {
    newDoclet: function (e) {
        var meta = e.doclet.meta;
        var description = e.doclet.description;

        var sourceString = '';
        var sourceLines = [];
        var commentsArr = [];

        if (typeof description === 'string' && meta.path && meta.filename) {
            // Set sourceString
            var fileContent = fs.readFileSync(
                path.join(meta.path || '.', meta.filename),
                'utf-8'
            );

            // Set sourceLines
            for (var i = meta.range[0]; i < meta.range[1]; i++) {
                sourceString += fileContent[i];
            }
            sourceLines = sourceString.split('\n');

            // Set commentsArr
            for (var j in sourceLines) {
                if (sourceLines[j].indexOf('//') !== -1) {
                    commentsArr.push(sourceLines[j].split('//')[1]);
                }
            }

            // Set new description if commentsArr is full
            if (commentsArr.length > 0) {
                e.doclet.description += '\n<b>Specs:</b>\n<ol>\n';
                for (var k = 0; k < commentsArr.length; k++) {
                    e.doclet.description += '<li>' + commentsArr[k] + '</li>\n';
                }
                e.doclet.description += '</ol>';
            }
        }
    }
};
