'use strict';

describe('@event and @fires/@emits tags', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/eventfirestag.js');
    var snowballMethod = docSet.getByLongname('Hurl#snowball')[0];
    var snowballEvent = docSet.getByLongname('Hurl#event:snowball')[0];
    var footballMatchMethod = docSet.getByLongname('Hurl#footballMatch')[0];

    // @event tag
    it('When a symbol has an @event tag, the doclet is of kind "event".', function() {
        expect(snowballEvent.kind).toBe('event');
    });

    // @fires/@emits tag
    it('When a symbol has a @fires tag, the doclet has an array named "fires".', function() {
        expect(typeof snowballMethod.fires).toBe('object');
    });

    it('When a symbol has an @emits tag, the doclet has an array named "fires".', function() {
        expect(typeof footballMatchMethod.fires).toBe('object');
    });

    it('When a symbol has a "fires" array, the members have the "event:" namespace.', function() {
        expect(snowballMethod.fires[0]).toBe('Hurl#event:snowball');
    });

    it('When a symbol has a "fires" array with a name that already has an "event:" namespace, ' +
        'it does not have a second namespace applied.', function() {
        expect(snowballMethod.fires[1]).toBe('Hurl#event:brick');
    });
});
