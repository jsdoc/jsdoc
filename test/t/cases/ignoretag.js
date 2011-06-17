(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/ignoretag.js'),
        foo = docSet.getByLongname('foo')[0];
    
    test('When a symbol has an @ignore tag, the doclet has a ignore property set to true.', function() {
        assert.equal(foo.ignore, true);
    });

})();