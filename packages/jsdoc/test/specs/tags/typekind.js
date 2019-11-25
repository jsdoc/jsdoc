describe('@kind tag with type', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/typekind.js');
    const blog = docSet.getByLongname('module:blog/server')[0];
    const port = docSet.getByLongname('module:blog/server.port')[0];

    it('When a module symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', () => {
        expect(blog.type).toBeObject();
        expect(blog.type.names.join(', ')).toBe('ConnectServer');
    });

    it('When a property symbol has an kind tag, that includes a {type} clause, the doclet has a type property set to that {type} clause', () => {
        expect(port.type).toBeObject();
        expect(port.type.names.join(', ')).toBe('number');
    });
});
