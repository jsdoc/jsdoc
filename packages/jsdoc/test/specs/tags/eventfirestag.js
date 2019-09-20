describe('@event and @fires/@emits tags', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/eventfirestag.js');
    const snowballMethod = docSet.getByLongname('Hurl#snowball')[0];
    const snowballEvent = docSet.getByLongname('Hurl#event:snowball')[0];
    const footballMatchMethod = docSet.getByLongname('Hurl#footballMatch')[0];

    // @event tag
    it('When a symbol has an @event tag, the doclet is of kind "event".', () => {
        expect(snowballEvent.kind).toBe('event');
    });

    // @fires/@emits tag
    it('When a symbol has a @fires tag, the doclet has an array named "fires".', () => {
        expect(snowballMethod.fires).toBeArray();
    });

    it('When a symbol has an @emits tag, the doclet has an array named "fires".', () => {
        expect(footballMatchMethod.fires).toBeArray();
    });

    it('When a symbol has a "fires" array, the members have the "event:" namespace.', () => {
        expect(snowballMethod.fires[0]).toBe('Hurl#event:snowball');
    });

    it('When a symbol has a "fires" array with a name that already has an "event:" namespace, ' +
        'it does not have a second namespace applied.', () => {
        expect(snowballMethod.fires[1]).toBe('Hurl#event:brick');
    });
});
