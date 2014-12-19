'use strict';

describe('@interface tag', function() {
    var definitions = require('jsdoc/tag/dictionary/definitions');
    var Dictionary = require('jsdoc/tag/dictionary').Dictionary;
    var doclet = require('jsdoc/doclet');
    var logger = require('jsdoc/util/logger');

    var docSet = jasmine.getDocSetFromFile('test/fixtures/interface-implements.js');
    var testerInterface = docSet.getByLongname('ITester')[0];
    var testerImplementation = docSet.getByLongname('MyTester')[0];

    it('ITester has its kind set to "interface"', function() {
        expect(testerInterface.kind).toBe('interface');
    });

    it('MyTester class has its kind set to "class" (not "interface")', function() {
        expect(testerImplementation.kind).toBe('class');
    });

    describe('virtual doclets', function() {
        var tagDict;

        beforeEach(function() {
            spyOn(logger, 'warn');
        });

        afterEach(function() {
            tagDict = new Dictionary();
            definitions.defineTags(tagDict);
            doclet._replaceDictionary(tagDict);
        });

        it('should support virtual doclets with the JSDoc tag dictionary', function() {
            var docSet2;
            var virtualInterface;

            tagDict = new Dictionary();
            definitions.defineTags(tagDict, definitions.jsdocTags);
            doclet._replaceDictionary(tagDict);

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).not.toHaveBeenCalled();
            expect(virtualInterface).toBeDefined();
            expect(virtualInterface.longname).toBe('VirtualInterface');
        });

        it('should not support virtual doclets with the Closure tag dictionary', function() {
            var docSet2;
            var virtualInterface;

            tagDict = new Dictionary();
            definitions.defineTags(tagDict, definitions.closureTags);
            doclet._replaceDictionary(tagDict);

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).toHaveBeenCalled();
            expect(virtualInterface).not.toBeDefined();
        });
    });
});
