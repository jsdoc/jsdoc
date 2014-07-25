'use strict';

var _ = require('underscore');

exports.handlers = {

    /**
     * replace google closure type annotation style (optional, defaultValue) to jsdoc3 annotation.
     * "{boolean=} round [false] blah blah..." to "{boolean} [round=false]"
     */
    beforeParse: function(e) {
        var source = e.source,
            gjsStyleOptionalRegex = /\{(\(?[\w]+\)?)\=\}[\t\s]+(\w+)[\t\s]+\[([\w\s\'\"]+)\]/g,
            match,

            annotation,
            type,
            name,
            defaultValue,

            annotationLength,
            index,

            leftPart, rightPart;

        while(match = gjsStyleOptionalRegex.exec(source)){
            annotation = match[0];
            type = match[1];
            name = match[2];
            defaultValue = match[3];

            annotationLength = annotation.length;
            index = match.index;

            leftPart = source.substr(0, index);
            rightPart = source.substr(index + annotationLength, source.length - (index + annotationLength));

            e.source = source = leftPart + '{' + type + '}' + ' [' + name + '=' + defaultValue + ']' + rightPart;
        }

    }
};