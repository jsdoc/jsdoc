'use strict';

describe('@mixes tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/mixintag.js');
    var FormButton = docSet.getByLongname('FormButton')[0];
    var MyClass = docSet.getByLongname('MyClass')[0];

    it("When a symbol has a @mixes tag, it gets an array property 'mixes' with the name of the mixin", function() {
        expect(FormButton.mixes).toBeDefined();
        expect(Array.isArray(FormButton.mixes)).toBe(true);
        expect(FormButton.mixes.length).toBe(1);
        expect(FormButton.mixes[0]).toBe('Eventful');
    });

    it('When a symbol has more than one @mixes tag, all of the mixins are added', function() {
        expect(MyClass.mixes).toBeDefined();
        expect(MyClass.mixes.length).toBe(2);
        expect(MyClass.mixes).toContain('Eventful');
        expect(MyClass.mixes).toContain('AnotherMixin');
    });
});
