describe('gjstype plugins', function() {
    var parser = jasmine.createParser();
    var path = require('jsdoc/path');

    var pluginPath = 'plugins/gjstype';
    var pluginPathResolved = path.join(env.dirname, pluginPath);

    require('jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    var docSet = jasmine.getDocSetFromFile('plugins/test/fixtures/gjstype.js', parser);

    it('replace default annotation of parameter description field.', function() {
        var findRegex = /\[[\w]+\=[\w\s\'\"]+\]/g;
        var myFunc = docSet.getByLongname('myFunc');

        expect(myFunc[0].comment.match(findRegex).length).toEqual(2);
    });

});