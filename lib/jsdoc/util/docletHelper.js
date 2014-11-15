'use strict';

var util = require('util');
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

    addSignatureTypes: function (doclet) {
        var types = doclet.type ? this.buildItemTypeStrings(doclet) : [];

        doclet.signature = (doclet.signature || '') + '<span class="type-signature">' +
            (types.length ? ' :' + types.join('|') : '') + '</span>';
    },

    addSignatureReturns: function (doclet) {
        // @todo compare with helper.getSignatureReturns

        var attribs = [];
        var attribsString = '';
        var returnTypes = [];
        var returnTypesString = '';

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

            attribsString = this.buildAttribsString(attribs);
        }

        if (doclet.returns) {
            returnTypes = this.addNonParamAttributes(doclet.returns);
        }

        if (returnTypes.length) {
            returnTypesString = util.format( ' &rarr; %s{%s}', attribsString, returnTypes.join('|') );
        }

        doclet.signature = '<span class="signature">' + (doclet.signature || '') + '</span>' +
            '<span class="type-signature">' + returnTypesString + '</span>';
    },

    addAttribs: function (doclet) {
        var attribs = helper.getAttribs(doclet);
        var attribsString = this.buildAttribsString(attribs);

        doclet.attribs = util.format('<span class="type-signature">%s</span>', attribsString);
    },

    hashToLink: function (doclet, hash) {
        if ( !/^(#.+)/.test(hash) ) {
            return hash;
        }

        var url = helper.createLink(doclet);

        url = url.replace(/(#.+|$)/, hash);
        return '<a href="' + url + '">' + hash + '</a>';
    },

    addSignatureParams: function (doclet) {
        var params = doclet.params ? this.addParamAttributes(doclet.params) : [];

        doclet.signature = util.format( '%s(%s)', (doclet.signature || ''), params.join(', ') );
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
    },

    /**
     * @private
     */
    addParamAttributes: function (params) {
        return params.filter(function(param) {
            return param.name && param.name.indexOf('.') === -1;
        }).map(this.updateItemName.bind(this));
    },

    /**
     * @private
     */
    updateItemName: function (item) {
        var attributes = this.getSignatureAttributes(item);
        var itemName = item.name || '';

        if (item.variable) {
            itemName = '&hellip;' + itemName;
        }

        if (attributes && attributes.length) {
            itemName = util.format( '%s<span class="signature-attributes">%s</span>', itemName,
                attributes.join(', ') );
        }

        return itemName;
    },

    /**
     * @private
     */
    getSignatureAttributes: function (item) {
        var attributes = [];

        if (item.optional) {
            attributes.push('opt');
        }

        if (item.nullable === true) {
            attributes.push('nullable');
        }
        else if (item.nullable === false) {
            attributes.push('non-null');
        }

        return attributes;
    },

    /**
     * @private
     */
    buildAttribsString: function (attribs) {
        var attribsString = '';

        if (attribs && attribs.length) {
            attribsString = helper.htmlsafe( util.format('(%s) ', attribs.join(', ')) );
        }

        return attribsString;
    }
};
