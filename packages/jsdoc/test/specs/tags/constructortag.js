describe('@constructor tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/constructortag.js');
    const feed = docSet.getByLongname('Feed')[0];

    it('When a symbol has an @constructor tag, it is documented as a class.', () => {
        expect(feed.kind).toBe('class');
    });

    it('When a symbol has an @constructor tag and a @class tag, the value of the @class tag becomes the classdesc property.', () => {
        expect(feed.classdesc).toBe('Describe your class here.');
        expect(feed.description).toBe('Describe your constructor function here.');
    });
});
