'use strict';

var helper = require('jsdoc/util/templateHelper');
var path = require('jsdoc/path');

module.exports = {
    needsSignature: function (doclet) {
        var needsSig = false;

        // function and class definitions always get a signature
        if (doclet.kind === 'function' || doclet.kind === 'class') {
            needsSig = true;
        }
        // typedefs that contain functions get a signature, too
        else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names &&
            doclet.type.names.length) {
            for (var i = 0, l = doclet.type.names.length; i < l; i++) {
                if (doclet.type.names[i].toLowerCase() === 'function') {
                    needsSig = true;
                    break;
                }
            }
        }

        return needsSig;
    },

    getSignatureTypes: function (doclet) {
        return doclet.type ? this.buildItemTypeStrings(doclet) : [];
    },

    // @todo compare with helper.getSignatureReturns
    getSignatureReturns: function (doclet) {
        var attribs = [];
        var returnTypes = [];

        // jam all the return-type attributes into an array. this could create odd results (for example,
        // if there are both nullable and non-nullable return types), but let's assume that most people
        // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
        if (doclet.returns) {
            doclet.returns.forEach(function(item) {
                helper.getAttribs(item).forEach(function(attrib) {
                    if (attribs.indexOf(attrib) === -1) {
                        attribs.push(attrib);
                    }
                });
            });
        }

        if (doclet.returns) {
            returnTypes = this.addNonParamAttributes(doclet.returns);
        }

        return {
            returnTypes: returnTypes,
            attribs: attribs
        };
    },

    hashToLink: function (doclet, hash) {
        if ( !/^(#.+)/.test(hash) ) {
            return hash;
        }

        var url = helper.createLink(doclet);

        url = url.replace(/(#.+|$)/, hash);
        return '<a href="' + url + '">' + hash + '</a>';
    },

    getPathFromDoclet: function (doclet) {
        if (!doclet.meta) {
            return null;
        }

        return doclet.meta.path && doclet.meta.path !== 'null' ?
            path.join(doclet.meta.path, doclet.meta.filename) :
            doclet.meta.filename;
    },

    /**
     * @private
     */
    addNonParamAttributes: function (items) {
        var types = [];

        items.forEach(function(item) {
            types = types.concat( this.buildItemTypeStrings(item) );
        }.bind(this));

        return types;
    },

    /**
     * @private
     */
    buildItemTypeStrings: function (item) {
        var types = [];

        if (item && item.type && item.type.names) {
            item.type.names.forEach(function(name) {
                types.push( helper.linkto(name, helper.htmlsafe(name)) );
            });
        }

        return types;
    }
};
