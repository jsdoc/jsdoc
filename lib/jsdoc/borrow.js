/**
 * A collection of functions relating to resolving @borrows tags in JSDoc symbols.
 * @module jsdoc/borrow
 */
const doop = require('jsdoc/util/doop');
const SCOPE = require('jsdoc/name').SCOPE;

function cloneBorrowedDoclets({borrowed, longname}, doclets) {
    borrowed.forEach(({from, as}) => {
        const borrowedDoclets = doclets.index.longname[from];
        let borrowedAs = as || from;
        let parts;
        let scopePunc;

        if (borrowedDoclets) {
            borrowedAs = borrowedAs.replace(/^prototype\./, SCOPE.PUNC.INSTANCE);
            doop(borrowedDoclets).forEach(clone => {
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
                clone.memberof = longname;
                clone.longname = clone.memberof + scopePunc + clone.name;
                doclets.push(clone);
            });
        }
    });
}

/**
    Take a copy of the docs for borrowed symbols and attach them to the
    docs for the borrowing symbol. This process changes the symbols involved,
    moving docs from the "borrowed" array and into the general docs, then
    deleting the "borrowed" array.
 */
exports.resolveBorrows = doclets => {
    for (let doclet of doclets.index.borrowed) {
        cloneBorrowedDoclets(doclet, doclets);
        delete doclet.borrowed;
    }

    doclets.index.borrowed = [];
};
