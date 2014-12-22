'use strict';

describe('@constructs tag', function() {
    it('When a symbol has a @constructs tag, it is documented as a class with that name.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag.js');
        var textblock = docSet.getByLongname('TextBlock')[0];

        expect(textblock.kind).toBe('class');
        expect(textblock.longname).toBe('TextBlock');
    });

    it('When a symbol has a @constructs tag, it is documented as a class.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag2.js');
        var menu = docSet.getByLongname('Menu')[0];

        expect(menu.name).toBe('Menu');
        expect(menu.kind).toBe('class');
    });

    it('When a function symbol has a @constructs tag, any this-variables are ducumented as instance members of the class.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag3.js');
        var personName = docSet.getByLongname('Person#name')[0];

        expect(personName.memberof).toBe('Person');
        expect(personName.scope).toBe('instance');
    });

    it('When a function symbol has a @constructs tag with no value, in a @lends block with a "Name#" value, the function is documented as a constructor of "Name".', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag4.js');
        var person = docSet.getByLongname('Person').filter(function($) {
            return !($.undocumented);
        })[0];

        expect(person.kind).toBe('class');
    });

    it('When a function symbol has a @constructs tag with no value, any this-variables are documented as instance members of the class.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag4.js');
        var personName = docSet.getByLongname('Person#name')[0];

        expect(personName.memberof).toBe('Person');
        expect(personName.scope).toBe('instance');
    });

    it('When a object literal property has a @constructs tag with no value, and the object has a @lends, the property is documented as the lent class.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/constructstag5.js');
        var duck = docSet.getByLongname('Duck').filter(function($) {
            return !($.undocumented);
        })[0];

        expect(duck.longname).toBe('Duck');
        expect(duck.kind).toBe('class');
        expect(duck.description).toBe('Constructs a duck.');
    });
});
