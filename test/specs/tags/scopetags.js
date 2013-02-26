describe('scope tags', function () {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/scopetags.js');

    // @inner, @instance, @static (@global has its own file)
    describe("@inner tag", function() {
        var doc = docSet.getByLongname('module:scopetags~myInner')[0];

        it("sets the doclet's 'scope' property to 'inner'", function() {
            expect(doc.scope).toBeDefined();
            expect(doc.scope).toBe('inner');
        });
    });

    describe("@instance tag", function() {
        var doc = docSet.getByLongname('module:scopetags#myInstance')[0];

        it("sets the doclet's 'scope' property to 'instance'", function() {
            expect(doc.scope).toBeDefined();
            expect(doc.scope).toBe('instance');
        });
    });

    describe("@static tag", function() {
        var doc = docSet.getByLongname('module:scopetags.myStatic')[0];

        it("sets the doclet's 'scope' property to 'static'", function() {
            expect(doc.scope).toBeDefined();
            expect(doc.scope).toBe('static');
        });
    });
});
