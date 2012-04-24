(function() {

    test('Should not crash when "contructor" property is used in Object.create() parameter', function() {
      var docSet = testhelpers.getDocSetFromFile('test/cases/contructorproperty.js');
      assert.ok(true);
    });

})();