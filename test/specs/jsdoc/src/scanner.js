/*global describe: true, env: true, expect: true, it: true */
describe("jsdoc/src/scanner", function() {
    var scanner = new (require('jsdoc/src/scanner').Scanner)(),
        filter = new (require('jsdoc/src/filter').Filter)({
            includePattern: new RegExp(".+\\.js(doc)?$"),
            excludePattern: new RegExp("(^|\\/|\\\\)_")
        }),
        path = require('path'),
        sourceFiles = scanner.scan([path.join(__dirname, 'test', 'fixtures', 'src')], 3, filter);

    sourceFiles = sourceFiles.map(function($) {
        return path.relative(__dirname, $);
    });

    it("should return the correct source files", function() {
        expect(sourceFiles.length).toEqual(3);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'one.js'))).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'two.js'))).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'dir1', 'three.js'))).toBeGreaterThan(-1);
    });
});