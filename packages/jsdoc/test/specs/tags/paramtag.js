describe('@param tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/paramtag.js');
    const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/paramtag2.js');

    it('When a symbol has an @param tag with a type before the name, the doclet has a params property that includes that param.', () => {
        const find = docSet.getByLongname('find')[0];

        expect(find.params).toBeArrayOfSize(1);
        expect(find.params[0].type.names.join(', ')).toBe('String, Array.<String>');
        expect(find.params[0].name).toBe('targetName');
        expect(find.params[0].description).toBe('The name (or names) of what to find.');
    });

    it('When a symbol has an @param tag with only a type and name, the doclet has a params property that includes that param.', () => {
        const bind = docSet.getByLongname('bind')[0];

        expect(bind.params).toBeArrayOfSize(1);
        expect(bind.params[0].type.names.join(', ')).toBe('function');
        expect(bind.params[0].name).toBe('callback');
        expect(bind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with only a type, the doclet has a params property that includes that param.', () => {
        const unbind = docSet.getByLongname('unbind')[0];

        expect(unbind.params).toBeArrayOfSize(1);
        expect(unbind.params[0].type.names.join(', ')).toBe('function');
        expect(unbind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with no type, the doclet has a params property that includes that param.', () => {
        const getElement = docSet.getByLongname('getElement')[0];

        expect(getElement.params).toBeArrayOfSize(1);
        expect(getElement.params[0].type).toBeUndefined();
        expect(getElement.params[0].name).toBe('id');
        expect(getElement.params[0].description).toBe('The id of the element.');
    });

    it('When a symbol has an @param tag with a non-alpha name like "...", the doclet has a params property that includes that param.', () => {
        const combine = docSet.getByLongname('combine')[0];

        expect(combine.params).toBeArrayOfSize(1);
        expect(combine.params[0].type).toBeUndefined();
        expect(combine.params[0].name).toBe('...');
        expect(combine.params[0].description).toBe('Two or more elements.');
    });

    it('When a symbol has an @param tag with name followed by a dash, the doclet has a params property that includes that param.', () => {
        const split = docSet.getByLongname('split')[0];

        expect(split.params).toBeArrayOfSize(1);
        expect(split.params[0].type).toBeUndefined();
        expect(split.params[0].name).toBe('delimiter');
        expect(split.params[0].description).toBe('What to split on.');
    });

    it('When a symbol has an @param tag with no name or type, the doclet has a params property that includes that param.', () => {
        const commit = docSet.getByLongname('commit')[0];

        expect(commit.params).toBeArrayOfSize(1);
        expect(commit.params[0].type).toBeUndefined();
        expect(commit.params[0].description).toBe('If true make the commit atomic.');
    });

    it('When a symbol has a @param tag with no type but a name that indicates a default value or optional type, this is copied over to the params property.', () => {
        const request = docSet.getByLongname('request')[0];

        expect(request.params).toBeArrayOfSize(1);
        expect(request.params[0].type).toBeUndefined();
        expect(request.params[0].name).toBe('async');
        expect(request.params[0].defaultvalue).toBeTrue();
        expect(request.params[0].optional).toBeTrue();
        expect(request.params[0].description).toBe('whether to be asynchronous');
    });

    it('When a symbol has a @param tag with no name, the doclet includes the param name from the code', () => {
        const commit = docSet.getByLongname('commit')[0];

        expect(commit.params).toBeArrayOfSize(1);
        expect(commit.params[0].name).toBe('atomic');
    });

    it('When a symbol has a @param tag with no name, and the symbol is part of an assignment expression, the doclet includes the param name from the code', () => {
        const classOpen = docSet.getByLongname('MySocket#open')[0];
        const moduleOpen = docSet2.getByLongname('module:mysocket.open')[0];

        expect(classOpen.params).toBeArrayOfSize(2);
        expect(classOpen.params[0].name).toBe('hostname');
        expect(classOpen.params[1].name).toBe('port');

        expect(moduleOpen.params).toBeArrayOfSize(2);
        expect(moduleOpen.params[0].name).toBe('hostname');
        expect(moduleOpen.params[1].name).toBe('port');
    });

    it('When a symbol has a @param tag with an invalid type expression, the JSDoc comment is ignored.', () => {
        const badDocSet = jsdoc.getDocSetFromFile('test/fixtures/paramtaginvalidtype.js');
        const test = badDocSet.getByLongname('Test#test')[0];

        expect(test).toBeObject();
        expect(test.meta).toBeObject();
        expect(test.meta.filename).toBe('[[string0]]');
        expect(test.description).toBeUndefined();
    });
});
