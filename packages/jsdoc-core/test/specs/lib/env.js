describe('@jsdoc/core.env', () => {
  const { env } = require('../../../index');

  it('exists', () => {
    expect(env).toBeObject();
  });

  it('has an `args` property', () => {
    expect(env.args).toBeArray();
  });

  it('has a `conf` property', () => {
    expect(env.conf).toBeObject();
  });

  it('has an `opts` property', () => {
    expect(env.opts).toBeObject();
  });

  it('has a `run` object with `start` and `finish` properties', () => {
    expect(env.run).toBeObject();
    expect(env.run.finish).toBeNull();
    expect(env.run.start).toBeInstanceOf(Date);
  });

  it('has a `sourceFiles` property', () => {
    expect(env.sourceFiles).toBeArray();
  });

  it('has a `version` object with `number` and `revision` properties', () => {
    expect(env.version).toBeObject();
    expect(Object.hasOwn(env.version, 'number')).toBeTrue();
    expect(Object.hasOwn(env.version, 'revision')).toBeTrue();
  });
});
