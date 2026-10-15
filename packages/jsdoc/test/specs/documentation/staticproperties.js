/*
  Test for static property scope bug
*/
describe('static properties scope detection', () => {
  const docSet = jsdoc.getDocSetFromFile('test/fixtures/staticproperties.js');

  // Get doclets by longname
  const instanceProp = docSet.getByLongname('TestClass#instanceProp')[0];
  const staticProp = docSet.getByLongname('TestClass.staticProp')[0];
  const staticGetter = docSet.getByLongname('TestClass.staticGetter')[0];
  const staticSetter = docSet.getByLongname('TestClass.staticSetter')[0];
  const instanceMethod = docSet.getByLongname('TestClass#instanceMethod')[0];
  const staticMethod = docSet.getByLongname('TestClass.staticMethod')[0];

  it('should correctly identify instance properties with instance scope', () => {
    expect(instanceProp).toBeObject();
    expect(instanceProp.name).toBe('instanceProp');
    expect(instanceProp.memberof).toBe('TestClass');
    expect(instanceProp.scope).toBe('instance');
    expect(instanceProp.longname).toBe('TestClass#instanceProp');
  });

  it('should correctly identify static properties with static scope', () => {
    expect(staticProp).toBeObject();
    expect(staticProp.name).toBe('staticProp');
    expect(staticProp.memberof).toBe('TestClass');
    expect(staticProp.scope).toBe('static');
    expect(staticProp.longname).toBe('TestClass.staticProp');
  });

  it('should correctly identify static getters with static scope', () => {
    expect(staticGetter).toBeObject();
    expect(staticGetter.name).toBe('staticGetter');
    expect(staticGetter.memberof).toBe('TestClass');
    expect(staticGetter.scope).toBe('static');
    expect(staticGetter.longname).toBe('TestClass.staticGetter');
  });

  it('should correctly identify static setters with static scope', () => {
    expect(staticSetter).toBeObject();
    expect(staticSetter.name).toBe('staticSetter');
    expect(staticSetter.memberof).toBe('TestClass');
    expect(staticSetter.scope).toBe('static');
    expect(staticSetter.longname).toBe('TestClass.staticSetter');
  });

  it('should correctly identify instance methods with instance scope', () => {
    expect(instanceMethod).toBeObject();
    expect(instanceMethod.name).toBe('instanceMethod');
    expect(instanceMethod.memberof).toBe('TestClass');
    expect(instanceMethod.scope).toBe('instance');
    expect(instanceMethod.longname).toBe('TestClass#instanceMethod');
  });

  it('should correctly identify static methods with static scope', () => {
    expect(staticMethod).toBeObject();
    expect(staticMethod.name).toBe('staticMethod');
    expect(staticMethod.memberof).toBe('TestClass');
    expect(staticMethod.scope).toBe('static');
    expect(staticMethod.longname).toBe('TestClass.staticMethod');
  });

  // Debug output to see what JSDoc actually parsed
  it('should output debug information about parsed doclets', () => {
    console.log('\n=== DEBUG: All TestClass doclets ===');
    const allDoclets = docSet.doclets.filter(
      (d) => d.memberof === 'TestClass' || d.longname === 'TestClass'
    );
    allDoclets.forEach((doclet) => {
      console.log(
        `Name: ${doclet.name}, Longname: ${doclet.longname}, Scope: ${doclet.scope}, Kind: ${doclet.kind}`
      );
    });
    console.log('=== END DEBUG ===\n');
  });
});
