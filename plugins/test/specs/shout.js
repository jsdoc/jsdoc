'use strict';

describe('shout plugin', function() {
    var env = require('../../../lib/jsdoc/env');
    var path = require('../../../lib/jsdoc/path');

    var docSet;
    var parser = jasmine.createParser();
    var pluginPath = 'plugins/shout';
    var pluginPathResolved = path.join(env.dirname, pluginPath);
    var plugin = require(pluginPathResolved);

    require('../../../lib/jsdoc/plugins').installPlugins([pluginPathResolved], parser);
    docSet = jasmine.getDocSetFromFile(pluginPath + '.js', parser);

    it('should make the description uppercase', function() {
        var doclet = docSet.getByLongname('module:plugins/shout.handlers.newDoclet');
        expect(doclet[0].description).toEqual('MAKE YOUR DESCRIPTIONS MORE SHOUTIER.');
    });
});
