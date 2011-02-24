(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/innerscope.js'),
        to = docSet.getByLongname('Message~headers.to'),
        from = docSet.getByLongname('Message~headers.from');
    
    //dump(docSet);
    
    test('When a member of a var member is documented.', function() {
        assert.equal(to.length, 1, 'It is like Outer~inner.member.');
    });
    
    test('When a deeply nested member of a var member is documented.', function() {
        assert.equal(from.length, 1, 'It is still like Outer~inner.member.');
    });
})();