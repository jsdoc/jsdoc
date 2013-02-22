describe("@param tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/paramtag.js'),
        find = docSet.getByLongname('find')[0],
        unbind = docSet.getByLongname('unbind')[0],
        bind = docSet.getByLongname('bind')[0],
        getElement = docSet.getByLongname('getElement')[0],
        combine = docSet.getByLongname('combine')[0],
        split = docSet.getByLongname('split')[0],
        commit = docSet.getByLongname('commit')[0];

    it('When a symbol has an @param tag with a type before the name, the doclet has a params property that includes that param.', function() {
        expect(typeof find.params).toBe('object');
        expect(find.params.length).toBe(1);
        expect(find.params[0].type.names.join(', ')).toBe('String, Array<String>');
        expect(find.params[0].name).toBe('targetName');
        expect(find.params[0].description).toBe('The name (or names) of what to find.');
    });

    it('When a symbol has an @param tag with only a type and name, the doclet has a params property that includes that param.', function() {
        expect(typeof bind.params).toBe('object');
        expect(bind.params.length).toBe(1);
        expect(bind.params[0].type.names.join(', ')).toBe('function');
        expect(bind.params[0].name).toBe('callback');
        expect(bind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with only a type, the doclet has a params property that includes that param.', function() {
        expect(typeof unbind.params).toBe('object');
        expect(unbind.params.length).toBe(1);
        expect(unbind.params[0].type.names.join(', ')).toBe('function');
        expect(unbind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with no type, the doclet has a params property that includes that param.', function() {
        expect(typeof getElement.params).toBe('object');
        expect(getElement.params.length).toBe(1);
        expect(getElement.params[0].type).toBeUndefined();
        expect(getElement.params[0].name).toBe('id');
        expect(getElement.params[0].description).toBe('The id of the element.');
    });

    it('When a symbol has an @param tag with a non-alpha name like "...", the doclet has a params property that includes that param.', function() {
        expect(typeof combine.params).toBe('object');
        expect(combine.params.length).toBe(1);
        expect(combine.params[0].type).toBeUndefined();
        expect(combine.params[0].name).toBe('...');
        expect(combine.params[0].description).toBe('Two or more elements.');
    });

    it('When a symbol has an @param tag with name followed by a dash, the doclet has a params property that includes that param.', function() {
        expect(typeof split.params).toBe('object');
        expect(split.params.length).toBe(1);
        expect(split.params[0].type).toBeUndefined();
        expect(split.params[0].name).toBe('delimiter');
        expect(split.params[0].description).toBe('What to split on.');
    });

    it('When a symbol has an @param tag with no name or type, the doclet has a params property that includes that param.', function() {
        expect(typeof commit.params).toBe('object');
        expect(commit.params.length).toBe(1);
        expect(commit.params[0].type).toBeUndefined();
        expect(commit.params[0].description).toBe('If true make the commit atomic.');
    });

    it('When a symbol has an @param tag with no name and a name is given in the code, the doclet has a params property that includes that param with the name from the code.', function() {
        expect(commit.params[0].name).toBe('atomic');
    });
});