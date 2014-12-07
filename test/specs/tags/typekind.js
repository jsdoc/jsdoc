'use strict';

describe('@kind tag with type', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typekind.js');
    var blog = docSet.getByLongname('module:blog/server')[0];
    var port = docSet.getByLongname('module:blog/server.port')[0];

    it('When a module symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', function() {
        expect(typeof blog.type).toBe('object');
        expect(blog.type.names.join(', ')).toBe('ConnectServer');
    });

    it('When a property symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', function() {
        expect(typeof port.type).toBe('object');
        expect(port.type.names.join(', ')).toBe('number');
    });
});
