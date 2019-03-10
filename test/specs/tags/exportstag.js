describe('@exports tag', () => {
    describe('object literals', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag.js');
        const shirt = docSet.getByLongname('module:my/shirt')[0];
        const color = docSet.getByLongname('module:my/shirt.color')[0];
        const tneck = docSet.getByLongname('module:my/shirt.Turtleneck')[0];
        const size = docSet.getByLongname('module:my/shirt.Turtleneck#size')[0];

        it('When an objlit symbol has an @exports tag, the doclet is aliased to "module:" + the tag value.', () => {
            expect(typeof shirt).toEqual('object');
            expect(shirt.alias).toEqual('my/shirt');
            expect(shirt.undocumented).not.toBeDefined();
        });

        it('When an objlit symbol has an @exports tag, the doclet\'s longname includes the "module:" namespace.', () => {
            expect(shirt.longname).toEqual('module:my/shirt');
        });

        it('When an objlit symbol has an @exports tag, the doclet kind is set to module.', () => {
            expect(shirt.kind).toEqual('module');
        });

        it('When an objlit symbol has an @exports tag, the module doclet does not have a scope.', () => {
            expect(shirt.scope).not.toBeDefined();
        });

        it('When an objlit symbol has an @exports tag, the objlit members are documented as members of the module.', () => {
            expect(typeof color).toEqual('object');
            expect(color.memberof).toEqual('module:my/shirt');

            expect(typeof tneck).toEqual('object');
            expect(tneck.memberof).toEqual('module:my/shirt');

            expect(typeof size).toEqual('object');
            expect(size.memberof).toEqual('module:my/shirt.Turtleneck');
        });
    });

    describe('functions', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag2.js');
        const coat = docSet.getByLongname('module:my/coat')[0];
        const wool = docSet.getByLongname('module:my/coat#wool')[0];

        it('When a function symbol has an @exports tag, the doclet is aliased to "module:" + the tag value.', () => {
            expect(typeof coat).toEqual('object');
            expect(coat.alias).toEqual('my/coat');
        });

        it('When a function symbol has an @exports tag, the doclet\'s longname includes the "module:" namespace.', () => {
            expect(coat.longname).toEqual('module:my/coat');
        });

        it('When a function symbol has an @exports tag, the doclet kind is set to module.', () => {
            expect(coat.kind).toEqual('module');
        });

        it('When a function symbol has an @exports tag, the module doclet does not have a scope.', () => {
            expect(coat.scope).not.toBeDefined();
        });

        it('When a function symbol has an @exports tag, the this members are documented as instance members of the module.', () => {
            expect(typeof wool).toEqual('object');
            expect(wool.memberof).toEqual('module:my/coat');
        });
    });

    describe("functions and 'exports' object", () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag3.js');
        const html = docSet.getByLongname('module:html/utils')[0];
        const getstyle = docSet.getByLongname('module:html/utils.getStyleProperty')[0];
        const inhead = docSet.getByLongname('module:html/utils.isInHead')[0];

        it('When a function symbol has an @exports tag, the module doclet does not have a scope.', () => {
            expect(html.scope).not.toBeDefined();
        });

        it('When a function symbol has an @exports tag and there is an objlit named "exports" the members are documented as members of the module.', () => {
            expect(typeof getstyle).toEqual('object');
            expect(getstyle.memberof).toEqual('module:html/utils');
        });

        it('When a function symbol has an @exports tag and there are members assigned to an "exports" name, the members are documented as members of the module.', () => {
            expect(typeof inhead).toEqual('object');
            expect(inhead.memberof).toEqual('module:html/utils');
        });
    });

    describe('inner classes', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag4.js');
        const module = docSet.getByLongname('module:some/module')[0];
        const innerClass = docSet.getByLongname('module:some/module~myClass')[0];
        const method = docSet.getByLongname('module:some/module~myClass#myMethod')[0];

        it('When a function symbol has an @exports tag, the module doclet does not have a scope.', () => {
            expect(module.scope).not.toBeDefined();
        });

        it('An inner class declared as a function in a module should be documented.', () => {
            expect(typeof innerClass).toEqual('object');
        });

        it('A method of an inner class declared as a function in a module should be documented.', () => {
            expect(typeof method).toEqual('object');
        });
    });

    describe('variable shadowing', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag5.js');
        const foo = docSet.getByLongname('module:Foo')[0];
        const method = docSet.getByLongname('module:Foo#bar')[0];

        it('When a var has an @exports tag, the module doclet does not have a scope.', () => {
            expect(foo.scope).not.toBeDefined();
        });

        it('A variable defined in an inner scope should correctly shadow a variable in an outer scope.', () => {
            expect(method.description).toBe('This should be in the Foo module doc.');
        });
    });

    describe("'exports' object as a parameter to 'define'", () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag6.js');
        const shirt = docSet.getByLongname('module:my/shirt')[0];
        const color = docSet.getByLongname('module:my/shirt.color')[0];
        const tneck = docSet.getByLongname('module:my/shirt.Turtleneck')[0];
        const size = docSet.getByLongname('module:my/shirt.Turtleneck#size')[0];

        it('When a param has an @exports tag, the doclet is aliased to "module:" + the tag value.', () => {
            expect(typeof shirt).toBe('object');
            expect(shirt.alias).toBe('my/shirt');
            expect(shirt.undocumented).not.toBeDefined();
        });

        it('When a param has an @exports tag, the doclet\'s longname includes the "module:" namespace.', () => {
            expect(shirt.longname).toBe('module:my/shirt');
        });

        it('When a param has an @exports tag, the doclet kind is set to module.', () => {
            expect(shirt.kind).toEqual('module');
        });

        it('When a param has an @exports tag, the module doclet does not have a scope.', () => {
            expect(shirt.scope).not.toBeDefined();
        });

        it('When a param has an @exports tag, the properties added to the param are documented as members of the module.', () => {
            expect(typeof color).toBe('object');
            expect(color.memberof).toBe('module:my/shirt');

            expect(typeof tneck).toBe('object');
            expect(tneck.memberof).toBe('module:my/shirt');

            expect(typeof size).toBe('object');
            expect(size.memberof).toBe('module:my/shirt.Turtleneck');
        });
    });

    describe("alias to the 'exports' object", () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag7.js');
        const shirt = docSet.getByLongname('module:my/shirt')[0];
        const color = docSet.getByLongname('module:my/shirt.color')[0];
        const tneck = docSet.getByLongname('module:my/shirt.Turtleneck')[0];
        const size = docSet.getByLongname('module:my/shirt.Turtleneck#size')[0];
        const iron = docSet.getByLongname('module:my/shirt.Turtleneck#iron')[0];

        it('When a symbol has an @exports tag, the doclet is aliased to "module:" + the tag value.', () => {
            expect(typeof shirt).toBe('object');
            expect(shirt.alias).toBe('my/shirt');
            expect(shirt.undocumented).not.toBeDefined();
        });

        it('When a symbol has an @exports tag, the doclet kind is set to module.', () => {
            expect(shirt.kind).toEqual('module');
        });

        it('When a symbol has an @exports tag, the module doclet does not have a scope.', () => {
            expect(shirt.scope).not.toBeDefined();
        });

        it('When a symbol tagged with @exports is an alias to "exports", the symbol properties are documented as members of the module.', () => {
            expect(typeof color).toBe('object');
            expect(color.memberof).toBe('module:my/shirt');

            expect(typeof tneck).toBe('object');
            expect(tneck.memberof).toBe('module:my/shirt');
        });

        it('When a symbol tagged with @exports is an alias to "exports", and a symbol property contains a class, the instance members of the class are documented correctly.', () => {
            expect(typeof size).toBe('object');
            expect(size.name).toBe('size');
            expect(size.memberof).toBe('module:my/shirt.Turtleneck');
            expect(size.scope).toBe('instance');

            expect(typeof iron).toBe('object');
            expect(iron.name).toBe('iron');
            expect(iron.memberof).toBe('module:my/shirt.Turtleneck');
            expect(iron.scope).toBe('instance');
        });
    });

    describe('"module:" namespace included in the name', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/exportstag8.js');
        const shirt = docSet.getByLongname('module:my/shirt')[0];

        it('When the name for an @exports tag begins with the "module:" namespace, we remove the namespace', () => {
            expect(typeof shirt).toBe('object');
            expect(shirt.name).toBe('my/shirt');
        });
    });
});
