/*global describe: true, expect: true, it: true */
describe('jsdoc/tag/type/closureCompilerType', function() {
    // TODO: more tests
    
    var type = require('jsdoc/tag/type/closureCompilerType');

    it('should exist', function() {
        expect(type).toBeDefined();
        expect(typeof type).toEqual('object');
    });
    
    it('should export a parse function', function() {
        expect(type.parse).toBeDefined();
        expect(typeof type.parse).toEqual('function');
    });
    
    describe('parse', function() {
        it('should correctly parse types that are both optional and nullable', function() {
            var info = type.parse( {type: '?string='} );
            expect(info.type).toEqual('string');
            expect(info.optional).toEqual(true);
            expect(info.nullable).toEqual(true);
        });
    });
});
