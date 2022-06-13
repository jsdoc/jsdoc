const options = jsdoc.deps.get('options');

describe('multiple @param tags with the same type expression', () => {
  const debug = Boolean(options.debug);

  afterEach(() => {
    options.debug = debug;
  });

  it('does not have circular references when type.parsedType is enumerable', () => {
    let docSet;
    let params;
    let stringified;

    // Force type.parsedType to be enumerable.
    options.debug = true;
    docSet = jsdoc.getDocSetFromFile('test/fixtures/paramtagsametype.js');
    params = docSet.getByLongname('foo.bar.Baz').filter((d) => !d.undocumented)[0].params;
    stringified = JSON.stringify(params);

    expect(stringified).toContain('"parsedType":');
    expect(stringified).not.toContain('<CircularRef>');

    // Prevent the schema validator from complaining about `parsedType`. (The schema _should_
    // allow that property, but for some reason, that doesn't work correctly.)
    params.forEach((p) => delete p.type.parsedType);
  });
});
