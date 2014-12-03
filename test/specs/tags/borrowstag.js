'use strict';

describe('@borrows tag', function() {
    it('When a symbol has a @borrows-as tag, that is added to the symbol\'s "borrowed" property.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/borrowstag.js');
        var util = docSet.getByLongname('util').filter(function($) {
            return ! $.undocumented;
        })[0];

        expect(util.borrowed.length).toBe(1);
        expect(util.borrowed[0].from).toBe('trstr');
        expect(util.borrowed[0].as).toBe('trim');
    });

    it('When a symbol has a @borrows tag, the borrowed symbol is added to the symbol.', function() {
        var borrow = require('jsdoc/borrow');
        var docSet = jasmine.getDocSetFromFile('test/fixtures/borrowstag2.js');

        borrow.resolveBorrows(docSet.doclets);

        var strRtrim = docSet.getByLongname('str.rtrim').filter(function($) {
            return ! $.undocumented;
        })[0];

        expect(typeof strRtrim).toBe('object');
    });
});
