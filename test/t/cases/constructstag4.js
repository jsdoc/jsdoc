(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/constructstag4.js'),
        personName = docSet.getByLongname('Person#name')[0];
    
    test('When a function symbol has an @constructs tag with no value, any this-variables are ducumented as instance members of the class.', function() {
        assert.equal(personName.memberof, 'Person');
        assert.equal(personName.scope, 'instance');
    });
    
})();