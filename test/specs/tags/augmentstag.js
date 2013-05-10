/*global describe: true, expect: true, it: true, jasmine: true */
 describe("@augments tag", function() {
    /*jshint unused: false */
    var docSet = jasmine.getDocSetFromFile('test/fixtures/augmentstag.js'),
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
        barMethod2 = docSet.getByLongname('Bar#method2')[0],
        barMethod2All = docSet.getByLongname('Bar#method2'),
        bazProp1 = docSet.getByLongname('Baz#prop1')[0],
        bazProp1All = docSet.getByLongname('Baz#prop1'),
        bazProp2 = docSet.getByLongname('Baz#prop2')[0],
        bazProp3 = docSet.getByLongname('Baz#prop3')[0],
        bazMethod1 = docSet.getByLongname('Baz#method1')[0],
        bazMethod2 = docSet.getByLongname('Baz#method2')[0],
        bazMethod3 = docSet.getByLongname('Baz#method3')[0],

        docSet2 = jasmine.getDocSetFromFile('test/fixtures/augmentstag2.js'),
        qux = docSet2.getByLongname('Qux')[0],

        docSet3 = jasmine.getDocSetFromFile('test/fixtures/augmentstag3.js'),
        FooMethod1 = docSet3.getByLongname('Foo#method1')[0],
        BarMethod2 = docSet3.getByLongname('Bar#method2')[0],
        FooBarMethod1 = docSet3.getByLongname('FooBar#method1')[0],
        FooBarMethod2 = docSet3.getByLongname('FooBar#method2')[0];

    it('When a symbol has an @augments tag, the doclet has a augments property that includes that value.', function() {
        expect(typeof bar.augments).toBe('object');
        expect(bar.augments[0]).toBe('Foo');
    });

    it('When an object is extended, the original is not modified', function() {
        expect(fooProp3).toBeUndefined();
    });

    it('When an object is extended, it inherits properties set in parent constructor', function() {
        expect(fooProp1.memberof).toBe("Foo");
        expect(barProp1.memberof).toBe("Bar");
        expect(barProp1.description).toBe(fooProp1.description);
    });

    it('When an object is extended, it inherits properties set on parent prototype', function() {
        expect(fooProp2.memberof).toBe("Foo");
        expect(barProp2.memberof).toBe("Bar");
        expect(barProp2.description).toBe(fooProp2.description);
    });

    it('When an object is extended, it inherits methods set on parent prototype', function() {
        expect(fooMethod1.memberof).toBe("Foo");
        expect(barMethod1.memberof).toBe("Bar");
        expect(barMethod1.description).toBe(fooMethod1.description);
    });

    it('When an object is extended, it may override methods set on parent prototype', function() {
        expect(fooMethod2.memberof).toBe("Foo");
        expect(fooMethod2.description).toBe("Second parent method.");
        expect(barMethod2.memberof).toBe("Bar");
        expect(barMethod2.description).toBe("Second child method.");
    });

    it('When an object is extended, and it overrides an ancestor method, the child does not include docs for the ancestor method.', function() {
        expect(barMethod2All.length).toBe(1);
    });

    it('When an object is extended, it inherits properties set on grandparent prototype', function() {
        expect(fooProp1.memberof).toBe("Foo");
        expect(barProp1.memberof).toBe("Bar");
        expect(bazProp1.memberof).toBe("Baz");
        expect(bazProp1.description).toBe("Override prop1");
        expect(bazMethod1.memberof).toBe("Baz");
        expect(bazMethod2.memberof).toBe("Baz");
        expect(bazMethod3.memberof).toBe("Baz");
    });

     it('(Grand)children correctly identify the original source of inherited members', function(){
         expect(fooProp1.inherits).not.toBeDefined();
         expect(barProp3.inherits).not.toBeDefined();
         expect(barProp1.inherits).toBe("Foo#prop1");
         expect(bazProp2.inherits).toBe("Foo#prop2");
         expect(bazProp3.inherits).toBe("Bar#prop3");
         expect(bazMethod1.inherits).toBe("Foo#method1");
     });

    it('When an object is extended, and it overrides an ancestor property, the child does not include docs for the ancestor property.', function() {
        expect(bazProp1All.length).toBe(1);
    });

    it('When a symbol has an @augments tag, and the parent is not documented, the doclet still has an augments property', function() {
        expect(typeof qux.augments).toBe('object');
        expect(qux.augments[0]).toBe('UndocumentedThing');
    });


    it('When a symbol @augments multiple parents, it inherits methods from all parents', function() {
        expect(FooBarMethod1).toBeDefined();
        expect(FooBarMethod2).toBeDefined();
        expect(FooBarMethod1.description).toBe(FooMethod1.description);
        expect(FooBarMethod2.description).toBe(BarMethod2.description);
    });
});
