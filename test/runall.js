load(BASEDIR + '/test/tests/01_jsdoc_opts.js');
load(BASEDIR + '/test/tests/02_jsdoc_src.js');
load(BASEDIR + '/test/tests/03_jsdoc_parser.js');
load(BASEDIR + '/test/tests/04_jsdoc_docset.js');

// see http://visionmedia.github.com/jspec/
JSpec.run({
	reporter: JSpec.reporters.Terminal,
	failuresOnly: false
})
.report();