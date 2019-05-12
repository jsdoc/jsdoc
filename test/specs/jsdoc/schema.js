describe('jsdoc/schema', () => {
    const schema = require('jsdoc/schema');

    it('should exist', () => {
        expect(schema).toBeDefined();
        expect(typeof schema).toBe('object');
    });

    it('should export a "BUGS_SCHEMA" object', () => {
        expect(schema.BUGS_SCHEMA).toBeDefined();
        expect(typeof schema.BUGS_SCHEMA).toBe('object');
    });

    it('should export a "CONTACT_INFO_SCHEMA" object', () => {
        expect(schema.CONTACT_INFO_SCHEMA).toBeDefined();
        expect(typeof schema.CONTACT_INFO_SCHEMA).toBe('object');
    });

    it('should export a "DOCLET_SCHEMA" object', () => {
        expect(schema.DOCLET_SCHEMA).toBeDefined();
        expect(typeof schema.DOCLET_SCHEMA).toBe('object');
    });

    it('should export a "DOCLETS_SCHEMA" object', () => {
        expect(schema.DOCLETS_SCHEMA).toBeDefined();
        expect(typeof schema.DOCLETS_SCHEMA).toBe('object');
    });

    it('should export an "ENUM_PROPERTY_SCHEMA" object', () => {
        expect(schema.ENUM_PROPERTY_SCHEMA).toBeDefined();
        expect(typeof schema.ENUM_PROPERTY_SCHEMA).toBe('object');
    });

    it('should export a "META_SCHEMA" object', () => {
        expect(schema.META_SCHEMA).toBeDefined();
        expect(typeof schema.META_SCHEMA).toBe('object');
    });

    it('should export a "PACKAGE_SCHEMA" object', () => {
        expect(schema.PACKAGE_SCHEMA).toBeDefined();
        expect(typeof schema.PACKAGE_SCHEMA).toBe('object');
    });

    it('should export a "PARAM_SCHEMA" object', () => {
        expect(schema.PARAM_SCHEMA).toBeDefined();
        expect(typeof schema.PARAM_SCHEMA).toBe('object');
    });

    it('should export a "TYPE_PROPERTY_SCHEMA" object', () => {
        expect(schema.TYPE_PROPERTY_SCHEMA).toBeDefined();
        expect(typeof schema.TYPE_PROPERTY_SCHEMA).toBe('object');
    });

    describe('validation', () => {
        const Ajv = require('ajv');

        const ajv = new Ajv({
            allErrors: true,
            ownProperties: true
        });
        const validate = ajv.compile(schema.DOCLETS_SCHEMA);

        it('should find validation errors in bogus input', () => {
            const doclets = [
                {
                    foo: 'bar'
                }
            ];
            const isValid = validate(doclets);

            expect(isValid).toBe(false);
        });

        it('should not find any validation errors in the JSDoc parse results', () => {
            jsdoc.getParseResults().forEach(doclets => {
                const isValid = validate(doclets.doclets);

                // hack to get the filename/errors in the test results
                if (!isValid) {
                    expect(doclets.filename).toBe('');
                    expect(validate.errors).toEqual([]);
                }
                else {
                    expect(validate.errors).toBe(null);
                }
            });
        });
    });
});
