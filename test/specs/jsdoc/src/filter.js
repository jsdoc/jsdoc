describe("jsdoc/src/filter", function() {
    var filter = new (require('jsdoc/src/filter').Filter)({
            includePattern: new RegExp(".+\\.js(doc)?$"),
            excludePattern: new RegExp("(^|\\/|\\\\)_"),
            exclude: ['.ignore', 'scratch/conf.js']
        });

    var files = ['yes.js', '/yes.jsdoc', '/_nope.js', '.ignore'];
    
    files = files.filter(function($) {
        return filter.isIncluded($);
    });

    it("should return the correct source files", function() {
        expect(files.length).toEqual(2);
        expect(files.indexOf("yes.js")).toBeGreaterThan(-1);
        expect(files.indexOf("/yes.jsdoc")).toBeGreaterThan(-1);
    });
});
