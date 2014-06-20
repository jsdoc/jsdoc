/*global describe, expect, it, jasmine */
'use strict';

describe('@param tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/paramtag.js');
    var docSet2 = jasmine.getDocSetFromFile('test/fixtures/paramtag2.js');

    it('When a symbol has an @param tag with a type before the name, the doclet has a params property that includes that param.', function() {
        var find = docSet.getByLongname('find')[0];

        expect(typeof find.params).toBe('object');
        expect(find.params.length).toBe(1);
        expect(find.params[0].type.names.join(', ')).toBe('String, Array.<String>');
        expect(find.params[0].name).toBe('targetName');
        expect(find.params[0].description).toBe('The name (or names) of what to find.');
    });

    it('When a symbol has an @param tag with only a type and name, the doclet has a params property that includes that param.', function() {
        var bind = docSet.getByLongname('bind')[0];

        expect(typeof bind.params).toBe('object');
        expect(bind.params.length).toBe(1);
        expect(bind.params[0].type.names.join(', ')).toBe('function');
        expect(bind.params[0].name).toBe('callback');
        expect(bind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with only a type, the doclet has a params property that includes that param.', function() {
        var unbind = docSet.getByLongname('unbind')[0];

        expect(typeof unbind.params).toBe('object');
        expect(unbind.params.length).toBe(1);
        expect(unbind.params[0].type.names.join(', ')).toBe('function');
        expect(unbind.params[0].description).toBeUndefined();
    });

    it('When a symbol has an @param tag with no type, the doclet has a params property that includes that param.', function() {
        var getElement = docSet.getByLongname('getElement')[0];

        expect(typeof getElement.params).toBe('object');
        expect(getElement.params.length).toBe(1);
        expect(getElement.params[0].type).toBeUndefined();
        expect(getElement.params[0].name).toBe('id');
        expect(getElement.params[0].description).toBe('The id of the element.');
    });

    it('When a symbol has an @param tag with a non-alpha name like "...", the doclet has a params property that includes that param.', function() {
        var combine = docSet.getByLongname('combine')[0];

        expect(typeof combine.params).toBe('object');
        expect(combine.params.length).toBe(1);
        expect(combine.params[0].type).toBeUndefined();
        expect(combine.params[0].name).toBe('...');
        expect(combine.params[0].description).toBe('Two or more elements.');
    });

    it('When a symbol has an @param tag with name followed by a dash, the doclet has a params property that includes that param.', function() {
        var split = docSet.getByLongname('split')[0];

        expect(typeof split.params).toBe('object');
        expect(split.params.length).toBe(1);
        expect(split.params[0].type).toBeUndefined();
        expect(split.params[0].name).toBe('delimiter');
        expect(split.params[0].description).toBe('What to split on.');
    });

    it('When a symbol has an @param tag with no name or type, the doclet has a params property that includes that param.', function() {
        var commit = docSet.getByLongname('commit')[0];

        expect(typeof commit.params).toBe('object');
        expect(commit.params.length).toBe(1);
        expect(commit.params[0].type).toBeUndefined();
        expect(commit.params[0].description).toBe('If true make the commit atomic.');
    });

    it('When a symbol has a @param tag with no type but a name that indicates a default value or optional type, this is copied over to the params property.', function() {
        var request = docSet.getByLongname('request')[0];

        expect(typeof request.params).toBe('object');
        expect(request.params.length).toBe(1);
        expect(request.params[0].type).toBeUndefined();
        expect(request.params[0].name).toBe('async');
        expect(request.params[0].defaultvalue).toBe('true');
        expect(request.params[0].optional).toBe(true);
        expect(request.params[0].description).toBe('whether to be asynchronous');
    });

    it('When a symbol has a @param tag with no name, the doclet includes the param name from the code', function() {
        var commit = docSet.getByLongname('commit')[0];

        expect(commit.params[0].name).toBe('atomic');
    });

    it('When a symbol has a @param tag with no name, and the symbol is part of an assignment expression, the doclet includes the param name from the code', function() {
        var classOpen = docSet.getByLongname('MySocket#open')[0];
        var moduleOpen = docSet2.getByLongname('module:mysocket.open')[0];

        expect(classOpen.params[0].name).toBe('hostname');
        expect(classOpen.params[1].name).toBe('port');

        expect(moduleOpen.params[0].name).toBe('hostname');
        expect(moduleOpen.params[1].name).toBe('port');
    });

    it('When a symbol has a @param tag with an invalid type expression, the JSDoc comment is ignored.', function() {
        var badDocSet = jasmine.getDocSetFromFile('test/fixtures/paramtaginvalidtype.js');
        var test = badDocSet.getByLongname('Test#test')[0];

        expect(test).toBeDefined();
        expect(typeof test).toBe('object');

        expect(test.meta).toBeDefined();
        expect(typeof test.meta).toBe('object');

        expect(test.meta.filename).toBeDefined();
        expect(test.meta.filename).toBe('[[string0]]');

        expect(test.description).not.toBeDefined();
    });
});
