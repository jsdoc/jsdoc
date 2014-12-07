'use strict';

describe('jsdoc/schema', function() {
    var schema = require('jsdoc/schema');

    it('should exist', function() {
        expect(schema).toBeDefined();
        expect(typeof schema).toBe('object');
    });

    it('should export a "BUGS_SCHEMA" object', function() {
        expect(schema.BUGS_SCHEMA).toBeDefined();
        expect(typeof schema.BUGS_SCHEMA).toBe('object');
    });

    it('should export a "CONTACT_INFO_SCHEMA" object', function() {
        expect(schema.CONTACT_INFO_SCHEMA).toBeDefined();
        expect(typeof schema.CONTACT_INFO_SCHEMA).toBe('object');
    });

    it('should export a "DOCLET_SCHEMA" object', function() {
        expect(schema.DOCLET_SCHEMA).toBeDefined();
        expect(typeof schema.DOCLET_SCHEMA).toBe('object');
    });

    it('should export a "DOCLETS_SCHEMA" object', function() {
        expect(schema.DOCLETS_SCHEMA).toBeDefined();
        expect(typeof schema.DOCLETS_SCHEMA).toBe('object');
    });

    it('should export an "ENUM_PROPERTY_SCHEMA" object', function() {
        expect(schema.ENUM_PROPERTY_SCHEMA).toBeDefined();
        expect(typeof schema.ENUM_PROPERTY_SCHEMA).toBe('object');
    });

    it('should export a "META_SCHEMA" object', function() {
        expect(schema.META_SCHEMA).toBeDefined();
        expect(typeof schema.META_SCHEMA).toBe('object');
    });

    it('should export a "PACKAGE_SCHEMA" object', function() {
        expect(schema.PACKAGE_SCHEMA).toBeDefined();
        expect(typeof schema.PACKAGE_SCHEMA).toBe('object');
    });

    it('should export a "PARAM_SCHEMA" object', function() {
        expect(schema.PARAM_SCHEMA).toBeDefined();
        expect(typeof schema.PARAM_SCHEMA).toBe('object');
    });

    it('should export a "TYPE_PROPERTY_SCHEMA" object', function() {
        expect(schema.TYPE_PROPERTY_SCHEMA).toBeDefined();
        expect(typeof schema.TYPE_PROPERTY_SCHEMA).toBe('object');
    });

    describe('validation', function() {
        var validate = require('tv4').validateMultiple;

        it('should find validation errors in bogus input', function() {
            var doclets = [
                {
                    foo: 'bar'
                }
            ];
            var validationResult = validate(doclets, schema.DOCLETS_SCHEMA);

            expect(validationResult.valid).toBe(false);
        });

        it('should not find any validation errors in the JSDoc parse results', function() {
            jasmine.getParseResults().forEach(function(doclets) {
                var validationResult;
                validationResult = validate(doclets.doclets, schema.DOCLETS_SCHEMA);

                // hack to get the filename/errors in the test results
                if (validationResult.errors.length) {
                    expect(doclets.filename).toBe('');
                    expect(validationResult.errors).toEqual([]);
                }
                else {
                    expect(validationResult.errors.length).toBe(0);
                }
            });
        });
    });
});
