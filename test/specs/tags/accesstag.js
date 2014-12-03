'use strict';

describe('@access tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/accesstag.js');
    var foo = docSet.getByLongname('Thingy~foo')[0];
    var _bar = docSet.getByLongname('Thingy#_bar')[0];
    var _gnu = docSet.getByLongname('Thingy#_gnu')[0];
    var pez = docSet.getByLongname('Thingy#pez')[0];
    var foo2 = docSet.getByLongname('OtherThingy~foo')[0];
    var _bar2 = docSet.getByLongname('OtherThingy#_bar')[0];
    var _gnu2 = docSet.getByLongname('OtherThingy#_gnu')[0];
    var pez2 = docSet.getByLongname('OtherThingy#pez')[0];

    it('should set the doclet\'s \'access\' property to \'private\' when there is an @access private tag', function() {
        expect(foo.access).toBe('private');
        expect(foo2.access).toBe('private');
    });

    it('should set the doclet\'s \'access\' property to \'protected\' when there is an @access protected tag', function() {
        expect(_bar.access).toBe('protected');
        expect(_bar2.access).toBe('protected');
    });

    it('should set the doclet\'s \'access\' property to \'public\' when there is an @access public tag', function() {
        expect(_gnu.access).toBe('public');
        expect(_gnu2.access).toBe('public');
    });

    it('should set no \'access\' property on the doclet when there is no @access tag', function() {
        expect(pez.access).toBeUndefined();
        expect(pez2.access).toBeUndefined();
    });
});
