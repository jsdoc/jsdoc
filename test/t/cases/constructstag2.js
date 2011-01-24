(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/constructstag2.js'),
        menu = docSet.getByLongname('Menu')[0],
        menuConstructor = docSet.getByLongname('Menu.constructor')[0];

    //dump(docSet.doclets); exit(0);
    
    test('When a symbol has an @class tag, it is documented as a class.', function() {
        assert.equal(menu.name, 'Menu');
        assert.equal(menu.kind, 'class');
    });
    
    test('When an anonymous function symbol has an @constructs <someClass> tag, the doclet has the longname of "<someClass>.constructor".', function() {
        assert.equal(menuConstructor.name, 'constructor');
        assert.equal(menuConstructor.memberof, 'Menu');
        assert.equal(menuConstructor.kind, 'function');
    });
})();