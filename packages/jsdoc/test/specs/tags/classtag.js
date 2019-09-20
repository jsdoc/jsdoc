function filter({undocumented}) {
    return !undocumented;
}

describe('@class tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/classtag.js');
    const ticker = docSet.getByLongname('Ticker')[0];
    const news = docSet.getByLongname('NewsSource')[0];

    it('When a symbol has a @class tag, the doclet has a kind property set to "class".', () => {
        expect(ticker.kind).toBe('class');
    });

    it('When a symbol has a @class tag with a value, the doclet has a name property set to that value.', () => {
        expect(news.kind).toBe('class');
        expect(news.longname).toBe('NewsSource');
    });

    describe('ES 2015 classes', () => {
        const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/classtag2.js');
        const subscription = docSet2.getByLongname('Subscription').filter(filter)[0];
        const expire = docSet2.getByLongname('Subscription#expire')[0];
        const subscriber = docSet2.getByLongname('Subscriber').filter(filter)[0];
        const hasCallback = docSet2.getByLongname('Subscriber#hasCallback')[0];
        const expiringSubscription = docSet2.getByLongname('subclasses.ExpiringSubscription')
            .filter(filter)[0];
        const invalidSubscriptionFoo = docSet2.getByLongname('subclasses.InvalidSubscription#foo')[0];

        it('When a symbol is a class declaration, the doclet does not require the @class tag', () => {
            expect(subscription.kind).toBe('class');
            expect(subscription.name).toBe('Subscription');
            expect(subscription.classdesc).toBe('Describe the Subscription class here.');
        });

        it('When a symbol is a class declaration, the constructor info is merged into the doclet for the symbol', () => {
            expect(subscription.description).toBe('Describe the constructor here.');
            expect(subscription.params).toBeArrayOfSize(1);
            expect(subscription.params[0].name).toBe('name');
            expect(subscription.examples).toBeArrayOfSize(1);
            expect(subscription.examples[0]).toBe('var subscription = new Subscription();');
        });

        it('When a symbol is a class declaration, its members get the correct longname and memberof', () => {
            expect(expire.kind).toBe('function');
            expect(expire.name).toBe('expire');
            expect(expire.memberof).toBe('Subscription');
        });

        it('When a symbol is a class expression, the doclet does not require the @class tag', () => {
            expect(subscriber.kind).toBe('class');
            expect(subscriber.name).toBe('Subscriber');
            expect(subscriber.classdesc).toBe('Describe the Subscriber class here.');
        });

        it('When a symbol is a class expression, the constructor info is merged into the doclet for the symbol', () => {
            expect(subscriber.description).toBe('Describe the constructor here.');
            expect(subscriber.params).toBeArrayOfSize(1);
            expect(subscriber.params[0].name).toBe('name');
        });

        it('When a symbol is a class expression, its members get the correct longname and memberof', () => {
            expect(hasCallback.kind).toBe('function');
            expect(hasCallback.name).toBe('hasCallback');
            expect(hasCallback.memberof).toBe('Subscriber');
        });

        it('When a class expression is assigned to an object property, it is parsed correctly', () => {
            expect(expiringSubscription.kind).toBe('class');
            expect(expiringSubscription.name).toBe('ExpiringSubscription');
            expect(expiringSubscription.params[0].name).toBe('name');
        });

        it('When a class is a static memberof something else, the class\' instance methods have the correct scope', () => {
            expect(invalidSubscriptionFoo.kind).toBe('function');
            expect(invalidSubscriptionFoo.name).toBe('foo');
            expect(invalidSubscriptionFoo.scope).toBe('instance');
        });
    });
});
