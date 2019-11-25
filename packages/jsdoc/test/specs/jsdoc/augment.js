describe('jsdoc/augment', () => {
    // TODO: more tests

    const augment = require('jsdoc/augment');

    it('should exist', () => {
        expect(augment).toBeObject();
    });

    it('should have an "addImplemented" method', () => {
        expect(augment.addImplemented).toBeFunction();
    });

    it('should have an "addInherited" method', () => {
        expect(augment.addInherited).toBeFunction();
    });

    it('should have an "addMixedIn" method', () => {
        expect(augment.addMixedIn).toBeFunction();
    });

    it('should have an "augmentAll" method', () => {
        expect(augment.augmentAll).toBeFunction();
    });

    xdescribe('addImplemented', () => {
        // TODO: add some basic tests (functionality is tested via @interface and @implements tags)
    });

    xdescribe('addInherited', () => {
        // TODO: add some basic tests (functionality is tested via @augments tag)
    });

    xdescribe('addMixedIn', () => {
        // TODO: add some basic tests (functionality is tested via documentation/mixes spec)
    });

    describe('augmentAll', () => {
        it('should call all other methods that the module exports', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixintag2.js', null, null, false);
            const methodNames = Object.keys(augment).filter(name => name !== 'augmentAll');

            methodNames.forEach(name => {
                spyOn(augment, name);
            });

            augment.augmentAll(docSet.doclets);

            methodNames.forEach(name => {
                expect(augment[name]).toHaveBeenCalled();
            });
        });

        it('should work when a class extends another class that implements an interface', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/augmentall.js', null, null, false);
            let open;

            augment.augmentAll(docSet.doclets);

            open = docSet.getByLongname('EncryptedSocket#open').filter(({ignore}) => !ignore);

            expect(open).toBeArrayOfSize(1);
            expect(open[0].description).toBe('Open the connection.');
        });

        it('should work when a class implements an interface that extends another interface', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/augmentall2.js', null, null, false);
            let open;

            augment.augmentAll(docSet.doclets);

            open = docSet.getByLongname('EncryptedSocket#open').filter(({ignore}) => !ignore);

            expect(open).toBeArrayOfSize(1);
            expect(open[0].description).toBe('Open the connection.');
        });
    });
});
