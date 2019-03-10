describe('@memberof tag', () => {
    it('When a symbol has a @member tag, the doclet has a long name that includes the parent.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag.js');
        const Data = docSet.getByLongname('mathlib.Data')[0];
        const point = docSet.getByLongname('mathlib.Data#point')[0];

        expect(typeof Data).toBe('object');
        expect(typeof point).toBe('object');

        expect(Data.memberof).toBe('mathlib');
        expect(Data.name).toBe('Data');
    });

    it('A symbol within a namespace for which no scope is specified.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag4.js');
        const doOtherStuff = docSet.getByLongname('doStuff.doOtherStuff')[0];

        expect(doOtherStuff).toBeDefined();
        expect(doOtherStuff.scope).toBe('static');
    });

    it('A symbol in which name === memberof.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag4.js');
        const doStuff = docSet.getByLongname('doStuff.doStuff')[0];

        expect(doStuff).toBeDefined();
        expect(doStuff.scope).toBe('static');
    });

    describe('static', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag2.js');
        const publish = docSet.getByLongname('Observable#publish')[0];
        const cache = docSet.getByLongname('Observable.cache')[0];

        it('A symbol is documented as a static @memberof a class.', () => {
            // it should appear as a static member of that class
            expect(typeof cache).toBe('object');
            expect(cache.memberof).toBe('Observable');
            expect(cache.scope).toBe('static');
            expect(cache.name).toBe('cache');
            expect(cache.longname).toBe('Observable.cache');
        });

        it('A symbol is documented as a static @memberof a class prototype.', () => {
            // it should appear as an instance member of that class
            expect(typeof publish).toBe('object');
            expect(publish.memberof).toBe('Observable');
            expect(publish.scope).toBe('instance');
            expect(publish.name).toBe('publish');
            expect(publish.longname).toBe('Observable#publish');
        });
    });

    describe('forced', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftagforced.js');
        const maproutes = docSet.getByLongname('map.routes')[0];
        const datapointy = docSet.getByLongname('Data#point.y')[0];

        it('A nested symbol with a @memberof! tag set to <global>.', () => {
            expect(maproutes.name, 'map.routes', 'Has a shortname that includes the nested names.');
        });

        it('A nested symbol with a @memberof! tag set to another symbol.', () => {
            expect(datapointy.name, 'point.y', 'Has a shortname that includes the nested names.');
        });
    });

    it('A symbol that is a nested class with a @memberof tag.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag3.js');
        const tree = docSet.getByLongname('module:terrain.Forest#Tree')[0];

        expect(tree.longname, 'module:terrain.Forest#Tree');
    });

    it('A symbol that is an instance member of a nested class with a @memberof tag.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag3.js');
        const leaf = docSet.getByLongname('module:terrain.Forest#Tree#leaf')[0];

        expect(leaf.longname, 'module:terrain.Forest#Tree#leaf');
    });

    it('Properties of a symbol with a @memberof tag inherit the @memberof info.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/memberoftag5.js');
        const open = docSet.getByLongname('module:network.Socket#open')[0];
        const uid = docSet.getByLongname('module:network.Socket.uid')[0];

        expect(open).toBeDefined();
        expect(uid).toBeDefined();
    });
});
