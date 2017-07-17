'use strict';

describe('@interface tag', function() {
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
        beforeEach(function() {
            spyOn(logger, 'warn');
        });

        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('should support virtual doclets with the JSDoc tag dictionary', function() {
            var docSet2;
            var virtualInterface;

            jasmine.replaceTagDictionary('jsdoc');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).not.toHaveBeenCalled();
            expect(virtualInterface).toBeDefined();
            expect(virtualInterface.longname).toBe('VirtualInterface');
        });

        it('should not support virtual doclets with the Closure tag dictionary', function() {
            var docSet2;
            var virtualInterface;

            jasmine.replaceTagDictionary('closure');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).toHaveBeenCalled();
            expect(virtualInterface).not.toBeDefined();
        });
    });

    describe('Closure Compiler tags', function() {
        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('should support @record as a synonym for @interface', function() {
            var docSet2;
            var myStructuralInterface;

            jasmine.replaceTagDictionary('closure');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag3.js');
            myStructuralInterface = docSet2.getByLongname('MyStructuralInterface')[0];

            expect(myStructuralInterface.kind).toBe('interface');
        });
    });
});
