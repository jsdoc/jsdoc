describe('jsdoc/src/handlers', () => {
    const handlers = require('jsdoc/src/handlers');

    const testParser = jasmine.createParser();

    handlers.attachTo(testParser);

    it('should exist', () => {
        expect(handlers).toBeDefined();
        expect(typeof handlers).toEqual('object');
    });

    it('should export an "attachTo" function', () => {
        expect(handlers.attachTo).toBeDefined();
        expect(typeof handlers.attachTo).toEqual('function');
    });

    describe('attachTo', () => {
        it('should attach a "jsdocCommentFound" handler to the parser', () => {
            const callbacks = testParser.listeners('jsdocCommentFound');

            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual('function');
        });

        it('should attach a "symbolFound" handler to the parser', () => {
            const callbacks = testParser.listeners('symbolFound');

            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual('function');
        });

        it('should attach a "fileComplete" handler to the parser', () => {
            const callbacks = testParser.listeners('fileComplete');

            expect(callbacks).toBeDefined();
            expect(callbacks.length).toEqual(1);
            expect(typeof callbacks[0]).toEqual('function');
        });
    });

    describe('jsdocCommentFound handler', () => {
        /* eslint-disable no-script-url */
        const sourceCode = 'javascript:/** @name bar */';
        /* eslint-enable no-script-url */
        const result = testParser.parse(sourceCode);

        it('should create a doclet for comments with "@name" tags', () => {
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('bar');
        });
    });

    xdescribe('symbolFound handler', () => {
        // TODO
    });
});
