/*
    Copyright 2014 Google Inc. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
'use strict';

var fsLoader = require('swig/lib/loaders/filesystem');
var path = require('path');
var util = require('util');

var REGEXP_TAG_ATTRIBUTES = '(\\s+[^>]+)?';
var REGEXP_HEADING_OPEN = new RegExp(util.format('<h%s>', REGEXP_TAG_ATTRIBUTES), 'g');
var REGEXP_HEADING_CLOSE = new RegExp('<\\\/h>', 'g');
var REGEXP_SECTION_OPEN = new RegExp(util.format('<section%s>', REGEXP_TAG_ATTRIBUTES), 'g');
var REGEXP_SECTION_CLOSE = new RegExp('<\\\/section>', 'g');

var jsdocLoader;

function onload(data) {
    Object.keys(jsdocLoader.onload).forEach(function(key) {
        data = jsdocLoader.onload[key].call(null, data);
    });

    return data;
}

jsdocLoader = function jsdocLoader(basepath, encoding) {
    var loader;

    encoding = encoding || 'utf8';
    basepath = basepath ? path.normalize(basepath) : null;

    loader = fsLoader(basepath, encoding);

    return {
        resolve: function(to, from) {
            return loader.resolve(to, from);
        },

        load: function(identifier, cb) {
            if (cb) {
                loader.load(identifier, function(err, data) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null, onload(data));
                    }
                });
            }
            else {
                return onload(loader.load(identifier));
            }
        }
    };
}

jsdocLoader.onload = {
    // Replace <h></h> with <{% h %}></{% endh %}> (also works if the opening tag has attributes)
    headings: function headings(data) {
        return data.replace(REGEXP_HEADING_OPEN, '<{% h %}$1>')
            .replace(REGEXP_HEADING_CLOSE, '</{% endh %}>');
    },
    // Add {% section %} tags to <section> elements so we can auto-increment the heading level
    sections: function sections(data) {
        return data.replace(REGEXP_SECTION_OPEN, '<section>{% section %}')
            .replace(REGEXP_SECTION_CLOSE, '{% endsection %}</section>');
    }
};

module.exports = jsdocLoader;
