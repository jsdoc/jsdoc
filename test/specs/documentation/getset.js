describe("When a getter or setter is the child of an object literal", function () {
    var docSet = jasmine.getDocSetFromFile("test/fixtures/getset.js"),
        foundName = docSet.getByLongname("Person#name"),
        foundAge = docSet.getByLongname("Person#age");

    it("should have a doclet with the correct longname", function () {
        expect(foundName.length).toEqual(2);
        expect(foundAge.length).toEqual(1);
    });

    it("should have a doclet with the correct name", function () {
        expect(foundName[0].name).toEqual("name");
        expect(foundName[1].name).toEqual("name");
        expect(foundAge[0].name).toEqual("age");
    });

    it("should have the correct memberof", function () {
        expect(foundName[0].memberof).toEqual("Person");
        expect(foundName[1].memberof).toEqual("Person");
        expect(foundAge[0].memberof).toEqual("Person");
    });

});
