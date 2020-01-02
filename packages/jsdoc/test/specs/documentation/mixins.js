const augment = require('jsdoc/augment');
const { SCOPE } = require('@jsdoc/core').name;

describe('mixins', () => {
    describe('doclet augmentation', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/mixintag2.js');

        augment.augmentAll(docSet.doclets);

        it('should create doclets for mixed-in symbols', () => {
            const objectBMethod = docSet.getByLongname('module:mixy.ObjectB.method')[0];

            expect(objectBMethod).toBeObject();
            expect(objectBMethod.memberof).toBe('module:mixy.ObjectB');
        });

        it('should set the "mixes" property correctly on first-generation mixers', () => {
            const objectBMethod = docSet.getByLongname('module:mixy.ObjectB.method')[0];

            expect(objectBMethod.mixes).toBeArrayOfSize(1);
            expect(objectBMethod.mixes[0]).toBe('module:mixy.ObjectA.method');
        });

        it('should set the "mixes" property correctly on second-generation mixers', () => {
            const objectCMethod = docSet.getByLongname('module:mixy.ObjectC.method')[0];

            expect(objectCMethod.mixes).toBeArrayOfSize(1);
            expect(objectCMethod.mixes[0]).toBe('module:mixy.ObjectB.method');
        });

        it('should work with mixed-in doclets whose names are specified in the comment', () => {
            const superSweetStatic = docSet.getByLongname('module:mixy.ObjectC.superSweet')[0];
            const superSweetInstance = docSet.getByLongname('module:mixy.ClassB#superSweet')[0];

            expect(superSweetInstance).toBeObject();
            expect(superSweetInstance.comment).toBe(superSweetStatic.comment);
        });

        describe('classes and mixins', () => {
            it('should define symbols mixed into a class as instance members', () => {
                const classAMethod = docSet.getByLongname('module:mixy.ClassA#method')[0];

                expect(classAMethod).toBeObject();
                expect(classAMethod.scope).toBe(SCOPE.NAMES.INSTANCE);
                expect(classAMethod.memberof).toBe('module:mixy.ClassA');
            });
        });
    });
});
