'use strict';

var logger = require('jsdoc/util/logger');

describe('@package tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/packagetag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('When a symbol has a @package tag, the doclet has an `access` property set to `package`.',
        function() {
            expect(foo.access).toBe('package');
        });

    describe('JSDoc tags', function() {
        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @package tag does not accept a value.', function() {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/packagetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @package tag accepts a type expression.',
            function() {
                var connectionPorts;
                var privateDocs;

                jasmine.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                privateDocs = jasmine.getDocSetFromFile('test/fixtures/packagetag2.js');
                connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(connectionPorts).toBeDefined();
                expect(connectionPorts.access).toBe('package');

                expect(connectionPorts.type).toBeDefined();
                expect(connectionPorts.type.names).toBeDefined();
                expect(connectionPorts.type.names.length).toBe(1);
                expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
            });
    });
});
