'use strict';

describe('@name tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/nametag.js');
    var view = docSet.getByLongname('View')[0];
    var controller = docSet.getByLongname('Controller')[0];
    var addToParent = docSet.getByLongname('MvcHelpers~addToParent')[0];

    it('applies the specified name to the doclet', function() {
        expect(view).toBeDefined();
    });

    it('uses the name in the @name tag, ignoring the name in the code', function() {
        expect(controller).toBeDefined();
    });

    it('sets the doclet\'s scope to `global` by default', function() {
        expect(view.scope).toBeDefined();
        expect(view.scope).toBe('global');

        expect(controller.scope).toBeDefined();
        expect(controller.scope).toBe('global');
    });

    it('uses the specified scope if one is provided', function() {
        expect(addToParent).toBeDefined();
        expect(addToParent.scope).toBe('inner');
    });
});
