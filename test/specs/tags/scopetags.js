// @inner, @instance, @static (@global has its own file)
describe("@inner tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @name Foo\n@scope inner */', {});

    it("sets the doclet's 'scope' property to 'inner'", function() {
        expect(doc.scope).toBeDefined();
        expect(doc.scope).toBe('inner');
    });
});

describe("@instance tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @name Foo\n@scope instance */', {});

    it("sets the doclet's 'scope' property to 'instance'", function() {
        expect(doc.scope).toBeDefined();
        expect(doc.scope).toBe('instance');
    });
});

describe("@static tag", function() {
    var doclet = require('jsdoc/doclet'),
        doc = new doclet.Doclet('/** @name Foo\n@scope static */', {});

    it("sets the doclet's 'scope' property to 'static'", function() {
        expect(doc.scope).toBeDefined();
        expect(doc.scope).toBe('static');
    });
});
