describe('jsdoc/tag/dictionary/definitions', function() {
    var type = require('jsdoc/tag/dictionary/definitions');

    it('should exist', function() {
        expect(type).toBeDefined();
        expect(typeof type).toBe('object');
    });
    
    it('should export a defineTags function', function() {
        expect(type.defineTags).toBeDefined();
        expect(typeof type.defineTags).toBe('function');
    });
    // whole bit of dictionary.defineTags...but it just calls dictionary.defineTag
    // and if I validate that then the rest is automatically validated?
});
