describe('@default tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/defaulttag.js');

    it('When symbol set to null has a @default tag with no text, the doclet\'s defaultValue property should be: null', () => {
        const request = docSet.getByLongname('request')[0];

        expect(request.defaultvalue).toBeNull();
    });

    it('When symbol set to a string has a @default tag with no text, the doclet\'s defaultValue property should be that string', () => {
        const response = docSet.getByLongname('response')[0];

        expect(response.defaultvalue).toBe('ok');
    });

    it('When symbol set to a number has a @default tag with no text, the doclet\'s defaultValue property should be that number.', () => {
        const rcode = docSet.getByLongname('rcode')[0];

        expect(rcode.defaultvalue).toBe(200);
    });

    it('When symbol has a @default tag with text, the doclet\'s defaultValue property should be that text.', () => {
        const win = docSet.getByLongname('win')[0];

        expect(win.defaultvalue).toBe('the parent window');
    });

    it('When symbol has a @default tag with true.', () => {
        const rvalid = docSet.getByLongname('rvalid')[0];

        expect(rvalid.defaultvalue).toBeTrue();
    });

    it('When symbol has a @default tag with false.', () => {
        const rerrored = docSet.getByLongname('rerrored')[0];

        expect(rerrored.defaultvalue).toBeFalse();
    });

    it('When symbol has a @default tag with a function call.', () => {
        const header = docSet.getByLongname('header')[0];

        expect(header.defaultvalue).toBeUndefined();
    });

    it('When symbol has a @default tag with an object, the doclet should contain the stringified object', () => {
        const obj = docSet.getByLongname('obj')[0];
        const testObj = {
            valueA: 'a',
            valueB: false,
            valueC: 7
        };

        expect(obj.defaultvalue).toBe( JSON.stringify(testObj) );
        expect(obj.defaultvaluetype).toBe('object');
    });

    it('When symbol has a @default tag with a multiline object, the doclet should contain the stringified object', () => {
        const multilineObject = docSet.getByLongname('multilineObject')[0];
        const testObj = {
            valueA: 'a',
            valueB: false,
            valueC: 7
        };

        expect(multilineObject.defaultvalue).toBe( JSON.stringify(testObj) );
        expect(multilineObject.defaultvaluetype).toBe('object');
    });

    it('When symbol has a @default tag with an array, the doclet should contain the stringified array', () => {
        const arr = docSet.getByLongname('arr')[0];
        const testArray = ['foo', true, 19];

        expect(arr.defaultvalue).toBe( JSON.stringify(testArray) );
        expect(arr.defaultvaluetype).toBe('array');
    });

    it('When symbol has a @default tag and a @type tag, the default value should be set correctly', () => {
        const defaultWithType = docSet.getByLongname('defaultWithType')[0];

        expect(defaultWithType.defaultvalue).toBe('a');
    });
});
