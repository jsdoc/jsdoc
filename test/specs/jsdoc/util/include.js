/*global afterEach: true, beforeEach: true, describe: true, env: true, expect: true, it: true,
__globalForIncludeTest__: true */
describe("jsdoc/util/include", function() {
    var include = require('jsdoc/util/include');
    var myGlobal = require('jsdoc/util/global');
    var path = require('path');

    var fixturePath = 'test/fixtures/include.js';

    beforeEach(function() {
        myGlobal.__globalForIncludeTest__ = 0;
    });

    afterEach(function() {
        myGlobal.__globalForIncludeTest__ = undefined;
    });

    it("should exist", function() {
        expect(include).toBeDefined();
        expect(typeof include).toEqual('function');
    });
    
    it("should work with a path relative to __dirname", function() {
        include(fixturePath);
        expect(__globalForIncludeTest__).toEqual(1);
    });

    // Note: This test also verifies that include() executes the file each time it's passed in,
    // rather than executing it once and caching the result, as with require().
    it("should work with an absolute path", function() {
        var _path = path.resolve(__dirname, fixturePath);

        include(_path);
        expect(__globalForIncludeTest__).toEqual(1);
    });
});
