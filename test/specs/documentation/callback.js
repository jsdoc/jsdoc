describe('callback tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/callbacktag.js');

    function callbackTests(callback) {
        expect(callback).toBeObject();

        expect(callback.type).toBeObject();

        expect(callback.type.names).toBeArrayOfSize(1);

        expect(callback.type.names[0]).toBe('function');
    }

    it('correctly handles callbacks that do not define a {type}', () => {
        const callback = docSet.getByLongname('requestResponseCallback')[0];

        callbackTests(callback);
    });

    it('correctly handles callbacks that define an incorrect {type}', () => {
        const callback = docSet.getByLongname('wrongTypeCallback')[0];

        callbackTests(callback);
    });
});
