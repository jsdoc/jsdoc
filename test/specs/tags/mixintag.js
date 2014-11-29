'use strict';

describe('@mixin tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/mixintag.js');
    var Eventful = docSet.getByLongname('Eventful')[0];
    var Mixin = docSet.getByLongname('AnotherMixin')[0];

    it("When a symbol has a @mixin tag, the doclet's 'kind' property is set to 'mixin'", function() {
        expect(Eventful.kind).toBe('mixin');
    });

    it("When a symbol has a @mixin tag, its name is set to the tag's value (if present)", function() {
        expect(Mixin).toBeDefined();
    });
});
