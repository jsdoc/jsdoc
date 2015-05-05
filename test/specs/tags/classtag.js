'use strict';

describe('@class tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/classtag.js');
    var ticker = docSet.getByLongname('Ticker')[0];
    var news = docSet.getByLongname('NewsSource')[0];

    it('When a symbol has a @class tag, the doclet has a kind property set to "class".', function() {
        expect(ticker.kind).toBe('class');
    });

    it('When a symbol has a @class tag with a value, the doclet has a name property set to that value.', function() {
        expect(news.kind).toBe('class');
        expect(news.longname).toBe('NewsSource');
    });

    if (jasmine.jsParser !== 'rhino') {
        describe('ES 2015 classes', function() {
            var docSet2 = jasmine.getDocSetFromFile('test/fixtures/classtag2.js');
            var subscription = docSet2.getByLongname('Subscription')[0];
            var expire = docSet2.getByLongname('Subscription#expire')[0];
            var subscriber = docSet2.getByLongname('Subscriber')[0];
            var hasCallback = docSet2.getByLongname('Subscriber#hasCallback')[0];
            var expiringSubscription = docSet2.getByLongname('subclasses.ExpiringSubscription')[0];
            var invalidSubscriptionFoo = docSet2.getByLongname('subclasses.InvalidSubscription#foo')[0];

            it('When a symbol is a class declaration, the doclet does not require the @class tag', function() {
                expect(subscription.kind).toBe('class');
                expect(subscription.name).toBe('Subscription');
                expect(subscription.classdesc).toBe('Describe the Subscription class here.');
            });

            it('When a symbol is a class declaration, the constructor info is merged into the doclet for the symbol', function() {
                expect(subscription.description).toBe('Describe the constructor here.');
                expect(subscription.params.length).toBe(1);
                expect(subscription.params[0].name).toBe('name');
            });

            it('When a symbol is a class declaration, its members get the correct longname and memberof', function() {
                expect(expire.kind).toBe('function');
                expect(expire.name).toBe('expire');
                expect(expire.memberof).toBe('Subscription');
            });

            it('When a symbol is a class expression, the doclet does not require the @class tag', function() {
                expect(subscriber.kind).toBe('class');
                expect(subscriber.name).toBe('Subscriber');
                expect(subscriber.classdesc).toBe('Describe the Subscriber class here.');
            });

            it('When a symbol is a class expression, the constructor info is merged into the doclet for the symbol', function() {
                expect(subscriber.description).toBe('Describe the constructor here.');
                expect(subscriber.params.length).toBe(1);
                expect(subscriber.params[0].name).toBe('name');
            });

            it('When a symbol is a class expression, its members get the correct longname and memberof', function() {
                expect(hasCallback.kind).toBe('function');
                expect(hasCallback.name).toBe('hasCallback');
                expect(hasCallback.memberof).toBe('Subscriber');
            });

            it('When a class expression is assigned to an object property, it is parsed correctly', function() {
                expect(expiringSubscription.kind).toBe('class');
                expect(expiringSubscription.name).toBe('ExpiringSubscription');
                expect(expiringSubscription.params[0].name).toBe('name');
            });

            it('When a class is a static memberof something else, the class\' instance methods have the correct scope', function() {
                expect(invalidSubscriptionFoo.kind).toBe('function');
                expect(invalidSubscriptionFoo.name).toBe('foo');
                expect(invalidSubscriptionFoo.scope).toBe('instance');
            });
        });
    }
});
