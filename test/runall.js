load(BASEDIR + '/test/tests/01_jsdoc_opts.js');
load(BASEDIR + '/test/tests/02_jsdoc_src.js');
load(BASEDIR + '/test/tests/03_jsdoc_parser.js');
load(BASEDIR + '/test/tests/04_jsdoc_docset.js');
load(BASEDIR + '/test/tests/05_jsdoc_doclet.js');
load(BASEDIR + '/test/tests/06_jsdoc_tag.js');

load(BASEDIR + '/test/tests/10_tag_constructor.js');
load(BASEDIR + '/test/tests/11_tag_namespace.js');
load(BASEDIR + '/test/tests/12_tag_property.js');
load(BASEDIR + '/test/tests/13_tag_method.js');
load(BASEDIR + '/test/tests/14_tag_member.js');

// see http://visionmedia.github.com/jspec/
JSpec.run({
	reporter: JSpec.reporters.Terminal,
	failuresOnly: false
})
.report();