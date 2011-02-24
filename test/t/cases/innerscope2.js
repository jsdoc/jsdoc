(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/innerscope2.js'),
        to = docSet.getByLongname('Message~headers.to'),
        from = docSet.getByLongname('<anonymous>~headers.from');
    
    //dump(docSet);
    
    test('When a var is masked by an inner var and a member of the inner is documented.', function() {
        assert.equal(from.length, 1, 'It is still like Inner~inner.member.');
    });
})();