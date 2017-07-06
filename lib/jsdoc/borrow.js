/**
 * A collection of functions relating to resolving @borrows tags in JSDoc symbols.
 * @module jsdoc/borrow
 */
'use strict';

var doop = require('jsdoc/util/doop');
var logger = require('jsdoc/util/logger');
var SCOPE = require('jsdoc/name').SCOPE;

var hasOwnProp = Object.prototype.hasOwnProperty;

// TODO: add the index at parse time, so we don't have to iterate over all the doclets again
exports.indexAll = function(doclets) {
    var borrowed = [];
    var doclet;
    var documented = {};
    var longname = {};

    for (var i = 0, l = doclets.length; i < l; i++) {
        doclet = doclets[i];

        // track all doclets by longname
        if ( !hasOwnProp.call(longname, doclet.longname) ) {
            longname[doclet.longname] = [];
        }
        longname[doclet.longname].push(doclet);

        // track longnames of documented symbols
        if (!doclet.undocumented) {
            if ( !hasOwnProp.call(documented, doclet.longname) ) {
                documented[doclet.longname] = [];
            }
            documented[doclet.longname].push(doclet);
        }

        // track doclets with a `borrowed` property
        if ( hasOwnProp.call(doclet, 'borrowed') ) {
            borrowed.push(doclet);
        }
    }

    doclets.index = {
        borrowed: borrowed,
        documented: documented,
        longname: longname
    };
};

function cloneBorrowedDoclets(doclet, doclets) {
    doclet.borrowed.forEach(function(borrowed) {
        var borrowedDoclets = doclets.index.longname[borrowed.from];
        var borrowedAs = borrowed.as || borrowed.from;
        var parts;
        var scopePunc;

        if (borrowedDoclets) {
            borrowedAs = borrowedAs.replace(/^prototype\./, SCOPE.PUNC.INSTANCE);
            doop(borrowedDoclets).forEach(function(clone) {
                // TODO: this will fail on longnames like '"Foo#bar".baz'
                parts = borrowedAs.split(SCOPE.PUNC.INSTANCE);

                if (parts.length === 2) {
                    clone.scope = SCOPE.NAMES.INSTANCE;
                    scopePunc = SCOPE.PUNC.INSTANCE;
                }
                else {
                    clone.scope = SCOPE.NAMES.STATIC;
                    scopePunc = SCOPE.PUNC.STATIC;
                }

                clone.name = parts.pop();
                clone.memberof = doclet.longname;
                clone.longname = clone.memberof + scopePunc + clone.name;
                doclets.push(clone);
            });
        }
    });
}

// requires docs to have been indexed: docs.index must be defined here
/**
    Take a copy of the docs for borrowed symbols and attach them to the
    docs for the borrowing symbol. This process changes the symbols involved,
    moving docs from the "borrowed" array and into the general docs, then
    deleting the "borrowed" array.
 */
exports.resolveBorrows = function(doclets) {
    var doclet;

    if (!doclets.index) {
        logger.error('Unable to resolve borrowed symbols, because the docs have not been indexed.');

        return;
    }

    for (var i = 0, l = doclets.index.borrowed.length; i < l; i++) {
        doclet = doclets.index.borrowed[i];

        cloneBorrowedDoclets(doclet, doclets);
        delete doclet.borrowed;
    }

    doclets.index.borrowed = [];
};
