/* global jsdoc */
describe('plugins/overloadHelper', () => {
    const env = require('jsdoc/env');
    const path = require('path');

    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = 'plugins/overloadHelper';
    const pluginPathResolved = path.resolve(env.dirname, pluginPath);
    const plugin = require(pluginPathResolved);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jsdoc.getDocSetFromFile('plugins/test/fixtures/overloadHelper.js', parser);

    it('should exist', () => {
        expect(plugin).toBeDefined();
        expect(typeof plugin).toBe('object');
    });

    it('should export handlers', () => {
        expect(plugin.handlers).toBeDefined();
        expect(typeof plugin.handlers).toBe('object');
    });

    it('should export a "newDoclet" handler', () => {
        expect(plugin.handlers.newDoclet).toBeDefined();
        expect(typeof plugin.handlers.newDoclet).toBe('function');
    });

    it('should export a "parseComplete" handler', () => {
        expect(plugin.handlers.parseComplete).toBeDefined();
        expect(typeof plugin.handlers.parseComplete).toBe('function');
    });

    describe('newDoclet handler', () => {
        it('should not add unique longnames to constructors', () => {
            const soup = docSet.getByLongname('Soup');
            const soup1 = docSet.getByLongname('Soup()');
            const soup2 = docSet.getByLongname('Soup(spiciness)');

            expect(soup.length).toBe(2);
            expect(soup1.length).toBe(0);
            expect(soup2.length).toBe(0);
        });

        it('should add unique longnames to methods', () => {
            const slurp = docSet.getByLongname('Soup#slurp');
            const slurp1 = docSet.getByLongname('Soup#slurp()');
            const slurp2 = docSet.getByLongname('Soup#slurp(dBA)');

            expect(slurp.length).toBe(0);
            expect(slurp1.length).toBe(1);
            expect(slurp2.length).toBe(1);
        });

        it('should update the "variation" property of the method', () => {
            const slurp1 = docSet.getByLongname('Soup#slurp()')[0];
            const slurp2 = docSet.getByLongname('Soup#slurp(dBA)')[0];

            expect(slurp1.variation).toBe('');
            expect(slurp2.variation).toBe('dBA');
        });

        it('should not add to or change existing variations that are unique', () => {
            const salt1 = docSet.getByLongname('Soup#salt');
            const salt2 = docSet.getByLongname('Soup#salt(mg)');

            expect(salt1.length).toBe(1);
            expect(salt2.length).toBe(1);
        });

        it('should not duplicate the names of existing numeric variations', () => {
            const heat1 = docSet.getByLongname('Soup#heat(1)');
            const heat2 = docSet.getByLongname('Soup#heat(2)');
            const heat3 = docSet.getByLongname('Soup#heat(3)');

            expect(heat1.length).toBe(1);
            expect(heat2.length).toBe(1);
            expect(heat3.length).toBe(1);
        });

        it('should replace identical variations with new, unique variations', () => {
            const discard1 = docSet.getByLongname('Soup#discard()');
            const discard2 = docSet.getByLongname('Soup#discard(container)');

            expect(discard1.length).toBe(1);
            expect(discard2.length).toBe(1);
        });
    });

    describe('parseComplete handler', () => {
        // disabled because on the second run, each comment is being parsed twice; who knows why...
        xit('should not retain parse results between parser runs', () => {
            parser.clear();
            docSet = jsdoc.getDocSetFromFile('plugins/test/fixtures/overloadHelper.js', parser);
            const heat = docSet.getByLongname('Soup#heat(4)');

            expect(heat.length).toBe(0);
        });
    });
});
