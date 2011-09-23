(function() {
    var docSet = testhelpers.getDocSetFromFile('test/cases/augmentstag.js'),
        foo = docSet.getByLongname('Foo')[0],
        fooProp1 = docSet.getByLongname('Foo#prop1')[0],
        fooProp2 = docSet.getByLongname('Foo#prop2')[0],
        fooProp3 = docSet.getByLongname('Foo#prop3')[0],
        fooMethod1 = docSet.getByLongname('Foo#method1')[0],
        fooMethod2 = docSet.getByLongname('Foo#method2')[0],
        bar = docSet.getByLongname('Bar')[0],
        barProp1 = docSet.getByLongname('Bar#prop1')[0],
        barProp2 = docSet.getByLongname('Bar#prop2')[0],
        barProp3 = docSet.getByLongname('Bar#prop3')[0],
        barMethod1 = docSet.getByLongname('Bar#method1')[0],
        barMethod2 = docSet.getByLongname('Bar#method2')[0];
    
    test('When a symbol has an @augments tag, the doclet has a augments property that includes that value.', function() {
        assert.equal(typeof bar.augments, 'object');
        assert.equal(bar.augments[0], 'Foo');
    });

    test('When an object is extended, the original is not modified', function() {
        assert.equal(fooProp3, undefined);
    });

    test('When an object is extended, it inherits properties set in parent constructor', function() {
        assert.equal(fooProp1.memberof, "Foo");
        assert.equal(barProp1.memberof, "Bar");
        assert.equal(barProp1.description, fooProp1.description);
    });

    test('When an object is extended, it inherits properties set on parent prototype', function() {
        assert.equal(fooProp2.memberof, "Foo");
        assert.equal(barProp2.memberof, "Bar");
        assert.equal(barProp2.description, fooProp2.description);
    });

    test('When an object is extended, it inherits methods set on parent prototype', function() {
        assert.equal(fooMethod1.memberof, "Foo");
        assert.equal(barMethod1.memberof, "Bar");
        assert.equal(barMethod1.description, fooMethod1.description);
    });

    test('When an object is extended, it may override methods set on parent prototype', function() {
        assert.equal(fooMethod2.memberof, "Foo");
        assert.equal(fooMethod2.description, "Second parent method.");
        assert.equal(barMethod2.memberof, "Bar");
        assert.equal(barMethod2.description, "Second child method.");
    });


})();