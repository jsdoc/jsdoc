(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/constructstag.js'),
        textblock = docSet.getByLongname('TextBlock')[0],
        textblockConstructor = docSet.getByLongname('TextBlock.constructor')[0];

    //dump(docSet.doclets); exit(0);
    
    test('When a symbol has an @class tag, it is documented as a class.', function() {
        assert.equal(textblock.name, 'TextBlock');
        assert.equal(textblock.kind, 'class');
    });
    
    test('When a symbol has an @constructs <someClass> tag, the doclet has the longname of "<someClass>.constructor".', function() {
        assert.equal(textblockConstructor.name, 'constructor');
        assert.equal(textblockConstructor.memberof, 'TextBlock');
        assert.equal(textblockConstructor.kind, 'function');
    });
})();