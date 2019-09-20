describe('jsdoc/src/handlers', () => {
    const handlers = require('jsdoc/src/handlers');

    const testParser = jsdoc.createParser();

    handlers.attachTo(testParser);

    it('should exist', () => {
        expect(handlers).toBeObject();
    });

    it('should export an "attachTo" function', () => {
        expect(handlers.attachTo).toBeFunction();
    });

    describe('attachTo', () => {
        it('should attach a "jsdocCommentFound" handler to the parser', () => {
            const callbacks = testParser.listeners('jsdocCommentFound');

            expect(callbacks).toBeArrayOfSize(1);
            expect(callbacks[0]).toBeFunction();
        });

        it('should attach a "symbolFound" handler to the parser', () => {
            const callbacks = testParser.listeners('symbolFound');

            expect(callbacks).toBeArrayOfSize(1);
            expect(callbacks[0]).toBeFunction();
        });

        it('should attach a "fileComplete" handler to the parser', () => {
            const callbacks = testParser.listeners('fileComplete');

            expect(callbacks).toBeArrayOfSize(1);
            expect(callbacks[0]).toBeFunction();
        });
    });

    describe('jsdocCommentFound handler', () => {
        /* eslint-disable no-script-url */
        const sourceCode = 'javascript:/** @name bar */';
        /* eslint-enable no-script-url */
        const result = testParser.parse(sourceCode);

        it('should create a doclet for comments with "@name" tags', () => {
            expect(result).toBeArrayOfSize(1);
            expect(result[0].name).toBe('bar');
        });
    });

    xdescribe('symbolFound handler', () => {
        // TODO
    });
});
