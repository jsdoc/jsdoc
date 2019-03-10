describe('@hideconstructor tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/hideconstructortag.js');
    const toaster = docSet.getByLongname('Toaster')[0];
    const waffleIron = docSet.getByLongname('WaffleIron').filter(({undocumented}) => !undocumented)[0];

    it('should add a `hideconstructor` attribute to pre-ES2015 classes', () => {
        expect(toaster.hideconstructor).toBe(true);
    });

    it('should add a `hideconstructor` attribute to ES2015 classes when the constructor is tagged',
        () => {
            expect(waffleIron.hideconstructor).toBe(true);
        });
});
