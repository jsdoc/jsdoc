/*global describe: true, env: true, expect: true, it: true */
describe("jsdoc/src/scanner", function() {
    var path = require('path');

    var filter = new (require('jsdoc/src/filter').Filter)({
        includePattern: new RegExp(".+\\.js(doc)?$"),
        excludePattern: new RegExp("(^|\\/|\\\\)_")
    });
    var scanner = new (require('jsdoc/src/scanner').Scanner)();
    var sourcePath = path.normalize(env.pwd + '/test/fixtures/src');
    var sourceFiles = scanner.scan([sourcePath], 3, filter);

    sourceFiles = sourceFiles.map(function($) {
        return path.relative(env.pwd, $);
    });

    it("should return the correct source files", function() {
        expect(sourceFiles.length).toEqual(3);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'one.js'))).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'two.js'))).toBeGreaterThan(-1);
        expect(sourceFiles.indexOf(path.join('test', 'fixtures', 'src', 'dir1', 'three.js'))).toBeGreaterThan(-1);
    });
});