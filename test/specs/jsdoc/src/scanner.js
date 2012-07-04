describe("jsdoc/src/scanner", function() {
    var scanner = new (require('jsdoc/src/scanner').Scanner)(),
        filter = new (require('jsdoc/src/filter').Filter)({
            includePattern: new RegExp(".+\\.js(doc)?$"),
            excludePattern: new RegExp("(^|\\/)_")
        }),
        sourceFiles = scanner.scan([env.dirname+'/test/fixtures/src/'], 3, filter);

    sourceFiles = sourceFiles.map(function($) {
        return $.replace(env.dirname, '');
    });

    it("should return the correct source files", function() {
        expect(sourceFiles.length).toEqual(3);
        expect(sourceFiles.indexOf("/test/fixtures/src/one.js")).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf("/test/fixtures/src/two.js")).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf("/test/fixtures/src/dir1/three.js")).toBeGreaterThan(-1);
    });
});