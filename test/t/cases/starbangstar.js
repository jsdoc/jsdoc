(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/starbangstar.js'),
        mod = docSet.getByLongname('module:myscript/core')[0];
    
    test('When doclet starts wuth /*!* it, it is treated as a JSDoc comment.', function() {
        assert.equal(mod.description, 'Script that does something awesome');
    });

})();