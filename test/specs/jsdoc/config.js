/*global describe: true, expect: true, it: true */
describe("jsdoc/config", function() {
    var jsdoc = {config: require('jsdoc/config') };

    it("should exist", function() {
        expect(jsdoc.config).toBeDefined();
        expect(typeof jsdoc.config).toEqual("function");
    });

    it("should provide a 'get' instance function", function() {
        var config = new jsdoc.config();
        expect(config.get).toBeDefined();
        expect(typeof config.get).toEqual("function");
    });
    
    describe ("constructor with empty", function() {
        it('should be possible to construct a Config with an empty arguments', function() {
            var config = new jsdoc.config().get();

            expect(config.plugins).toEqual([]);
        });
    });
    
    describe ("constructor with {}", function() {
        it('should be possible to construct a Config with JSON of an object literal that is emptys', function() {
            var config = new jsdoc.config('{}').get();

            expect(config.plugins).toEqual([]);
        });
    });
    
    describe ("constructor with plugins value", function() {
        it('should be possible to construct a Config with JSON of an object literal that has a plugin value', function() {
            var config = new jsdoc.config('{"plugins":[42]}').get();

            expect(config.plugins).toEqual([42]);
        });
    });
    
    describe ("constructor with source value", function() {
        it('should be possible to construct a Config with JSON of an object literal that has a source value', function() {
            var config = new jsdoc.config('{"source":{"includePattern":"hello"}}').get();

            expect(config.source.includePattern).toEqual('hello');
        });
    });
});