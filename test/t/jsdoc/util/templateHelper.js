(function() {

    var helper = require('jsdoc/util/templateHelper');
    helper.registerLink('test', 'path/to/test.html');
    helper.registerLink('test."long blah"/blah', 'path/to/test_long_blah_blah.html');
    
    test('ResolveLinks should translate {@link test} into a HTML link.', function() {
        var input = 'This is a {@link test}.',
            output = helper.resolveLinks(input);
        
        assert.equal(output, 'This is a <a href="path/to/test.html">test</a>.');
    });
    
    test('ResolveLinks should translate {@link test."long blah"/blah} into a HTML link.', function() {
        var input = 'This is a {@link test."long blah"/blah}.',
            output = helper.resolveLinks(input);
        
        assert.equal(output, 'This is a <a href="path/to/test_long_blah_blah.html">test."long blah"/blah</a>.');
    });
    
    test('ResolveLinks should translate {@link unknown} into a simple text.', function() {
        var input = 'This is a {@link unknown}.',
            output = helper.resolveLinks(input);
        
        assert.equal(output, 'This is a unknown.');
    });
    
    test('ResolveLinks should translate {@link test} into a HTML links multiple times.', function() {
        var input = 'This is a {@link test} and {@link test}.',
            output = helper.resolveLinks(input);
        
        assert.equal(output, 'This is a <a href="path/to/test.html">test</a> and <a href="path/to/test.html">test</a>.');
    });
    
    test('ResolveLinks should translate [hello there]{@link test} into a HTML link with the custom content.', function() {
        var input = 'This is a [hello there]{@link test}.',
            output = helper.resolveLinks(input);
        
        assert.equal(output, 'This is a <a href="path/to/test.html">hello there</a>.');
    });
    
    test('ResolveLinks should ignore [hello there].', function() {
        var input = 'This is a [hello there].',
            output = helper.resolveLinks(input);
        
        assert.equal(output, input);
    });

})();