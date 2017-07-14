'use strict';

describe('aliases', function() {
    describe('standard', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias.js');
        var found = docSet.getByLongname('myObject').filter(function($) {
            return !($.undocumented);
        });
        var foundMember = docSet.getByLongname('myObject.myProperty');

        it('When a symbol is given an alias it is documented as if the name is the alias value.', function() {
            expect(found[0].longname).toEqual('myObject');
        });

        it('When a symbol is a member of an alias it is documented as if the memberof is the alias value.', function() {
            expect(foundMember[0].longname).toEqual('myObject.myProperty');
            expect(foundMember[0].memberof).toEqual('myObject');
        });
    });

    it('When a symbol is a member of an alias of a nested name it is documented as if the memberof is the nested alias value.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias2.js');
        var foundMember = docSet.getByLongname('ns.Myclass#myProperty');

        expect(foundMember[0].longname).toEqual('ns.Myclass#myProperty');
        expect(foundMember[0].name).toEqual('myProperty');
        expect(foundMember[0].memberof).toEqual('ns.Myclass');
        expect(foundMember[0].scope).toEqual('instance');
    });

    it('When a symbol is a member of an aliased class, a this-variable is documented as if it were a member that class.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias3.js');
        var tcmValue = docSet.getByLongname('trackr.CookieManager#value')[0];

        expect(tcmValue.memberof).toEqual('trackr.CookieManager');
    });

    it('When a symbol is a function expression that has an alias, the symbol should get the correct longname', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias4.js');
        var jacketClass = docSet.getByLongname('module:jacket').filter(function($) {
            return $.kind === 'class';
        });

        expect(jacketClass.length).toBe(1);
        expect(jacketClass[0].longname).toBe('module:jacket');
    });

    describe('formats', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias5.js');
        var toast = docSet.getByLongname('Toaster#toast')[0];
        var getInstance = docSet.getByLongname('Toaster.getInstance')[0];
        var clean = docSet.getByLongname('Toaster#clean')[0];

        it('should work when the alias value specifies an instance member', function() {
            expect(toast).toBeDefined();
            expect(toast.name).toBe('toast');
            expect(toast.memberof).toBe('Toaster');
            expect(toast.scope).toBe('instance');
        });

        it('should work when the alias value specifies a static member', function() {
            expect(getInstance).toBeDefined();
            expect(getInstance.name).toBe('getInstance');
            expect(getInstance.memberof).toBe('Toaster');
            expect(getInstance.scope).toBe('static');
        });

        it('should work when the alias value only specifies the short name', function() {
            expect(clean).toBeDefined();
            expect(clean.name).toBe('clean');
            expect(clean.memberof).toBe('Toaster');
            expect(clean.scope).toBe('instance');
        });
    });

    it('When a symbol is a constructor of a class with an alias, the constructor should get the correct longname', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/alias6.js');
        var constructor = docSet.getByLongname('module:example')[2];

        expect(constructor.undocumented).toBe(true);
        expect(constructor.name).toBe('module:example');
        expect(constructor.alias).toBe('module:example');
    });

    it('When a symbol is documented as a static member of <global>, its scope is "global" and not "static".', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/aliasglobal.js');
        var log = docSet.getByLongname('log')[0];

        expect(log.scope).toEqual('global');
    });

    it('When a symbol is documented as an instance member of <global>, its scope is "instance" and not "static".', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/aliasglobal2.js');
        var run = docSet.getByLongname('Test#run')[0];

        expect(run.scope).toEqual('instance');
        expect(run.memberof).toEqual('Test');
    });

    describe('resolving', function() {
        it('When a local reference has alias, put all members into aliased definition. Local modifications should be visible to outside.', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/aliasresolve.js');
            var method = docSet.getByLongname('A.F.method');

            expect(method.length).toEqual(1);
        });

        it('When a reference in an outer scope has alias, put all members into aliased definition. Local modifications are visible to outside.', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/aliasresolve2.js');
            var method = docSet.getByLongname('A.F.method');

            expect(method.length).toEqual(1);
        });
    });
});
