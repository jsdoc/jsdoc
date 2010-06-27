load(BASEDIR + '/test/tests/01_jsdoc_opts.js');
load(BASEDIR + '/test/tests/02_jsdoc_src.js');

// see http://visionmedia.github.com/jspec/
JSpec.run({
	reporter: JSpec.reporters.Terminal,
	failuresOnly: false
})
.report();