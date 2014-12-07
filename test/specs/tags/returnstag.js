'use strict';

describe('@returns tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/returnstag.js');

    it('When a symbol has a @returns tag with a type and description, the doclet has a "returns" property that includes that info.', function() {
        var find = docSet.getByLongname('find')[0];

        expect(typeof find.returns).toBe('object');
        expect(find.returns.length).toBe(1);
        expect(find.returns[0].type.names.join(', ')).toBe('string, Array.<string>');
        expect(find.returns[0].description).toBe('The names of the found item(s).');
    });

    it('When a symbol has a @returns tag with a non-nullable type, the doclet indicates that the type is non-nullable', function() {
        var getName = docSet.getByLongname('getName')[0];

        expect(typeof getName.returns).toBe('object');
        expect(getName.returns.length).toBe(1);
        expect(getName.returns[0].nullable).toBe(false);
    });

    it('When a symbol has a @returns tag with only a description, the doclet has a "returns" property that includes the description.', function() {
        var bind = docSet.getByLongname('bind')[0];

        expect(typeof bind.returns).toBe('object');
        expect(bind.returns.length).toBe(1);
        expect(bind.returns[0].description).toBe('The binding id.');
    });

    it('When a symbol has a @returns tag without a type but with an inline tag, the inline tag is not mistaken for a type.', function() {
        var convert = docSet.getByLongname('convert')[0];

        expect(typeof convert.returns).toBe('object');
        expect(convert.returns.length).toBe(1);
        expect(convert.returns[0].description).toBe('An object to be passed to {@link find}.');
    });
});
