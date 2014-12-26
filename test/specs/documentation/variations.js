'use strict';

describe('variations by name', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/variations.js');
    var fadein1 = docSet.getByLongname('anim.fadein(1)')[0];
    var fadein2 = docSet.getByLongname('anim.fadein(2)')[0];

    it('When a symbol has a name with a variation, the doclet has a variation property.', function() {
        expect(fadein1.variation).toBe('1');
        expect(fadein2.variation).toBe('2');
    });

    it('When a symbol has a name with a variation in the name, the doclet name has no variation in it.', function() {
        expect(fadein1.name).toBe('fadein');
        expect(fadein2.name).toBe('fadein');
    });

    it('When a symbol has a name with a variation in the name, the doclet longname has the variation in it.', function() {
        expect(fadein1.longname).toBe('anim.fadein(1)');
        expect(fadein2.longname).toBe('anim.fadein(2)');
    });
});
