(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/classtag.js'),
        foo = docSet.getByLongname('Foo')[0];
    
    //dump(docSet.doclets); exit(0);
    
    test('When a symbol has a @class tag, the doclet has a classdesc property with that value.', function() {
        assert.equal(foo.classdesc, 'The class of Foo represent all those foo things.');
    });
    
    test('When a symbol has a @class tag, the doclet doclet description is separate from the classdesc.', function() {
        assert.equal(foo.description, 'This function creates a new Foo.');
    });

})();