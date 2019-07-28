function filterUndocumented({undocumented}) {
    return !(undocumented);
}

describe('@borrows tag', () => {
    it('When a symbol has a @borrows-as tag, that is added to the symbol\'s "borrowed" property.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag.js');
        const util = docSet.getByLongname('util').filter(filterUndocumented)[0];

        expect(util.borrowed).toBeArrayOfSize(1);
        expect(util.borrowed[0].from).toBe('trstr');
        expect(util.borrowed[0].as).toBe('trim');
    });

    it('When a symbol has a @borrows tag, the borrowed symbol is added to the symbol.', () => {
        const borrow = require('jsdoc/borrow');
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag2.js');

        borrow.resolveBorrows(docSet.doclets);

        const strRtrim = docSet.getByLongname('str.rtrim').filter(({undocumented}) => !(undocumented))[0];

        expect(strRtrim).toBeObject();
    });

    it('When a symbol has a `@borrows X as Y` tag, X and Y may contain whitespace.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/borrowstag3.js');
        const util = docSet.getByLongname('util').filter(filterUndocumented)[0];

        expect(util.borrowed).toBeArrayOfSize(2);
        expect(util.borrowed[0].from).toBe('trstr');
        expect(util.borrowed[0].as).toBe('trim string');
        expect(util.borrowed[1].from).toBe('util.hidden util');
        expect(util.borrowed[1].as).toBe('hidden');
    });
});
