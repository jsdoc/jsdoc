(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/borrowstag2.js'),
        str = docSet.getByLongname('str').filter(function($) {
            return ! $.undocumented;
        })[0];
    
    //dump(found);
    
    test('When a symbol has a @borrows tag, that is added to the symbol\'s "borrowed" property and the from is the same as the as property.', function() {
        assert.equal(str.borrowed.length, 1);
        assert.equal(str.borrowed[0].from, 'rtrim');
        assert.equal(str.borrowed[0].as, str.borrowed[0].from);
    });
})();