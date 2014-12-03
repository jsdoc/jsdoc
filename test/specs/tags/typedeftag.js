'use strict';

describe('@typedef tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typedeftag.js');
    var numberlike = docSet.getByLongname('calc.NumberLike')[0];
    var operator = docSet.getByLongname('calc.Operator')[0];
    var result = docSet.getByLongname('calc.Result')[0];
    var calculatorBattery = docSet.getByLongname('CalculatorBattery')[0];

    it('When a comment has a @typedef tag, the doclet has a kind property set to "typedef".', function() {
        expect(numberlike.kind).toBe('typedef');
    });

    it('When a comment has a @typedef tag with a type, the doclet has a type property set to that type.', function() {
        expect(typeof numberlike.type).toBe('object');
        expect(typeof numberlike.type.names).toBe('object');
        expect(numberlike.type.names.length).toBe(2);
        expect(numberlike.type.names[0]).toBe('string');
        expect(numberlike.type.names[1]).toBe('number');
    });

    it('When a comment has a @typedef tag with a name, the doclet has a name property set to that name.', function() {
        expect(numberlike.name).toBe('NumberLike');
        expect(numberlike.longname).toBe('calc.NumberLike');
    });

    it('When a symbol has a @typedef tag without a name, the doclet has a name property set to the symbol name.', function() {
        expect(operator.name).toBe('Operator');
        expect(operator.longname).toBe('calc.Operator');
    });

    it('When a symbol has a @typedef tag with a name, the name in the tag takes precedence over the symbol name.', function() {
        expect(result.name).toBe('Result');
        expect(result.longname).toBe('calc.Result');
    });

    it('When a symbol has a @typedef tag with a name and no scope, the scope defaults to `global`.', function() {
        expect(calculatorBattery).toBeDefined();
        expect(calculatorBattery.scope).toBe('global');
    });
});
