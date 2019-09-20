/* global jsdoc */
const env = require('jsdoc/env');
const path = require('jsdoc/path');

describe('markdown plugin', () => {
    const pluginPath = 'plugins/markdown';
    const pluginPathResolved = path.join(env.dirname, pluginPath);
    const plugin = require(pluginPathResolved);

    const docSet = jsdoc.getDocSetFromFile('plugins/test/fixtures/markdown.js');

    // TODO: more tests; refactor the plugin so multiple settings can be tested

    it('should process the correct tags by default', () => {
        const myClass = docSet.getByLongname('MyClass')[0];

        plugin.handlers.newDoclet({ doclet: myClass });
        [
            myClass.author[0],
            myClass.classdesc,
            myClass.description,
            myClass.exceptions[0].description,
            myClass.params[0].description,
            myClass.properties[0].description,
            myClass.returns[0].description,
            myClass.see,
            myClass.summary
        ].forEach(value => {
            // if we processed the value, it should be wrapped in a <p> tag
            expect( /^<p>(?:.+)<\/p>$/.test(value) ).toBe(true);
        });
    });

    it('should unescape &quot; entities in inline tags, but not elsewhere', () => {
        const myOtherClass = docSet.getByLongname('MyOtherClass')[0];

        plugin.handlers.newDoclet({ doclet: myOtherClass });

        expect(myOtherClass.description).toContain('chat."#channel"."say-\\"hello\\""');
        expect(myOtherClass.description).toContain('&quot;See&quot;');
    });

    describe('@see tag support', () => {
        const foo = docSet.getByLongname('foo')[0];
        const bar = docSet.getByLongname('bar')[0];

        it('should parse @see tags containing links', () => {
            plugin.handlers.newDoclet({ doclet: foo });
            expect(typeof foo).toEqual('object');
            expect(foo.see[0]).toEqual('<p><a href="http://nowhere.com">Nowhere</a></p>');
        });

        it('should not parse @see tags that do not contain links', () => {
            plugin.handlers.newDoclet({ doclet: bar });
            expect(typeof bar).toEqual('object');
            expect(bar.see[0]).toEqual('AnObject#myProperty');
        });
    });
});
