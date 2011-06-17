(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/augmentstag.js'),
        foo = docSet.getByLongname('Foo')[0],
        bar = docSet.getByLongname('Bar')[0];
    
    test('When a symbol has an @augments tag, the doclet has a augments property that includes that value.', function() {
        assert.equal(typeof bar.augments, 'object');
        assert.equal(bar.augments[0], 'Foo');
    });
})();