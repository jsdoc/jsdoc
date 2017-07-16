'use strict';

var logger = require('jsdoc/util/logger');

describe('@private tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/privatetag.js');
    var foo = docSet.getByLongname('Foo')[0];
    var bar = docSet.getByLongname('Foo#bar')[0];

    it('When a symbol has a @private tag, the doclet has an `access` property set to `private`.',
        function() {
            expect(foo.access).toBe('private');
        });

    it('When a symbol tagged with @private has members, the members do not inherit the @private ' +
        'tag.', function() {
        expect(bar.access).not.toBeDefined();
    });

    describe('JSDoc tags', function() {
        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @private tag does not accept a value.', function() {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', function() {
        afterEach(function() {
            jasmine.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            function() {
                var connectionPorts;
                var privateDocs;

                jasmine.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                privateDocs = jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');
                connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(connectionPorts).toBeDefined();
                expect(connectionPorts.access).toBe('private');

                expect(connectionPorts.type).toBeDefined();
                expect(connectionPorts.type.names).toBeDefined();
                expect(connectionPorts.type.names.length).toBe(1);
                expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
            });
    });
});
