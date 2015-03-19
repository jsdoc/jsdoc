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

            it('When a symbol is a class declaration, the doclet does not require the @class tag', function() {
                expect(subscription.kind).toBe('class');
                expect(subscription.longname).toBe('Subscription');
                expect(subscription.classdesc).toBe('Describe the Subscription class here.');
            });
        });
    }
});
