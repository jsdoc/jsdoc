describe('aliases', () => {
    describe('standard', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias.js');
        const found = docSet.getByLongname('myObject').filter(({undocumented}) => !(undocumented));
        const foundMember = docSet.getByLongname('myObject.myProperty');

        it('When a symbol is given an alias it is documented as if the name is the alias value.', () => {
            expect(found[0].longname).toBe('myObject');
        });

        it('When a symbol is a member of an alias it is documented as if the memberof is the alias value.', () => {
            expect(foundMember[0].longname).toBe('myObject.myProperty');
            expect(foundMember[0].memberof).toBe('myObject');
        });
    });

    it('When a symbol is a member of an alias of a nested name it is documented as if the memberof is the nested alias value.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias2.js');
        const foundMember = docSet.getByLongname('ns.Myclass#myProperty');

        expect(foundMember[0].longname).toBe('ns.Myclass#myProperty');
        expect(foundMember[0].name).toBe('myProperty');
        expect(foundMember[0].memberof).toBe('ns.Myclass');
        expect(foundMember[0].scope).toBe('instance');
    });

    it('When a symbol is a member of an aliased class, a this-variable is documented as if it were a member that class.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias3.js');
        const tcmValue = docSet.getByLongname('trackr.CookieManager#value')[0];

        expect(tcmValue.memberof).toBe('trackr.CookieManager');
    });

    it('When a symbol is a function expression that has an alias, the symbol should get the correct longname', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias4.js');
        const jacketClass = docSet.getByLongname('module:jacket').filter(({kind}) => kind === 'class');

        expect(jacketClass.length).toBe(1);
        expect(jacketClass[0].longname).toBe('module:jacket');
    });

    describe('formats', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias5.js');
        const toast = docSet.getByLongname('Toaster#toast')[0];
        const getInstance = docSet.getByLongname('Toaster.getInstance')[0];
        const clean = docSet.getByLongname('Toaster#clean')[0];

        it('should work when the alias value specifies an instance member', () => {
            expect(toast).toBeObject();
            expect(toast.name).toBe('toast');
            expect(toast.memberof).toBe('Toaster');
            expect(toast.scope).toBe('instance');
        });

        it('should work when the alias value specifies a static member', () => {
            expect(getInstance).toBeObject();
            expect(getInstance.name).toBe('getInstance');
            expect(getInstance.memberof).toBe('Toaster');
            expect(getInstance.scope).toBe('static');
        });

        it('should work when the alias value only specifies the short name', () => {
            expect(clean).toBeObject();
            expect(clean.name).toBe('clean');
            expect(clean.memberof).toBe('Toaster');
            expect(clean.scope).toBe('instance');
        });
    });

    it('When a symbol is a constructor of a class with an alias, the constructor should get the correct longname', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias6.js');
        const constructor = docSet.getByLongname('module:example')[2];

        expect(constructor.undocumented).toBe(true);
        expect(constructor.name).toBe('module:example');
        expect(constructor.alias).toBe('module:example');
    });

    it('When a symbol is documented as a static member of <global>, its scope is "global" and not "static".', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasglobal.js');
        const log = docSet.getByLongname('log')[0];

        expect(log.scope).toBe('global');
    });

    it('When a symbol is documented as an instance member of <global>, its scope is "instance" and not "static".', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasglobal2.js');
        const run = docSet.getByLongname('Test#run')[0];

        expect(run.scope).toBe('instance');
        expect(run.memberof).toBe('Test');
    });

    describe('resolving', () => {
        it('When a local reference has alias, put all members into aliased definition. Local modifications should be visible to outside.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasresolve.js');
            const method = docSet.getByLongname('A.F.method');

            expect(method).toBeArrayOfSize(1);
        });

        it('When a reference in an outer scope has alias, put all members into aliased definition. Local modifications are visible to outside.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasresolve2.js');
            const method = docSet.getByLongname('A.F.method');

            expect(method).toBeArrayOfSize(1);
        });
    });

    describe('class with constructor exported from module', () => {
        it('When an exported class with a constructor has an alias, the exported class has the correct scope.', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/aliasexports.js');
            const klass = docSet.getByLongname('module:foo.Bar').filter(d => !d.undocumented);

            expect(klass).toBeArrayOfSize(1);
            expect(klass[0].scope).toBe('static');
        });
    });
});
