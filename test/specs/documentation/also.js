/*global describe: true, expect: true, it: true, jasmine: true */
describe("multiple doclets per symbol", function() {
    function undocumented($) {
        return ! $.undocumented;
    }

    function checkInequality(doclets, property) {
        for (var l = doclets.length - 1; l > 0; l--) {
            if (doclets[l][property] !== undefined && doclets[l - 1][property] !== undefined) {
                expect(doclets[l][property]).not.toBe(doclets[l - 1][property]);
            }
        }
    }

    var docSet = jasmine.getDocSetFromFile('test/fixtures/also.js');
    var name = docSet.getByLongname('Asset#name').filter(undocumented);
    var shape = docSet.getByLongname('Asset#shape').filter(undocumented);

    it('When a symbol has multiple adjacent JSDoc comments, both apply to the symbol.', function() {
        expect(name.length).toBe(2);
        expect(shape.length).toBe(3);
    });

    it('When a symbol has multiple adjacent JSDoc comments that are not identical, the doclets ' +
        'have different comments.', function() {
        checkInequality(name, 'comment');
        checkInequality(shape, 'comment');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different descriptions, ' +
        'the doclets have different descriptions.', function() {
        checkInequality(name, 'description');
        checkInequality(shape, 'description');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@param tags, the doclets have different parameter lists.', function() {
        checkInequality(name, 'params.length');
        checkInequality(shape, 'params.length');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@returns tags, the doclets have different lists of return values.', function() {
        checkInequality(name, 'returns.length');
        checkInequality(shape, 'returns.length');
    });
});
