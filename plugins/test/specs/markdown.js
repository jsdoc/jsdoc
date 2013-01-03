describe("markdown plugin", function() {
    //TODO
});

describe("markdown see tag support", function() {
    var plugin = require('plugins/markdown'),
        docSet = jasmine.getDocSetFromFile('plugins/test/fixtures/seetag-markdown.js'),
        foo = docSet.getByLongname('foo')[0],
        bar = docSet.getByLongname('bar')[0];

    it ('should parse @see tags containing links', function() {
        plugin.handlers.newDoclet({doclet:foo});
        expect(typeof foo).toEqual('object');
        expect(foo.see[0]).toEqual('<p><a href="http://nowhere.com">Nowhere</a></p>');
    })

    it ('should not parse @see tags that do not contain links', function() {
        plugin.handlers.newDoclet({doclet:bar});
        expect(typeof bar).toEqual('object');
        expect(bar.see[0]).toEqual('AnObject#myProperty');
    })
});