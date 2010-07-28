load(BASEDIR + '/test/tests/01_jsdoc_opts.js');
load(BASEDIR + '/test/tests/02_jsdoc_src.js');
load(BASEDIR + '/test/tests/03_jsdoc_parser.js');
load(BASEDIR + '/test/tests/04_jsdoc_docset.js');
load(BASEDIR + '/test/tests/05_jsdoc_doclet.js');
load(BASEDIR + '/test/tests/06_jsdoc_tag.js');
load(BASEDIR + '/test/tests/07_jsdoc_resolvefunc.js');
load(BASEDIR + '/test/tests/07_jsdoc_resolvefunc_2.js');
load(BASEDIR + '/test/tests/07_jsdoc_resolvevar.js');
load(BASEDIR + '/test/tests/08_tag_name.js');
load(BASEDIR + '/test/tests/09_tag_desc.js');
load(BASEDIR + '/test/tests/10_tag_constructor.js');
load(BASEDIR + '/test/tests/11_tag_namespace.js');
load(BASEDIR + '/test/tests/12_tag_property.js');
load(BASEDIR + '/test/tests/13_tag_method.js');
load(BASEDIR + '/test/tests/14_tag_member.js');
load(BASEDIR + '/test/tests/15_tag_type.js');
load(BASEDIR + '/test/tests/16_tag_return.js');
load(BASEDIR + '/test/tests/17_tag_example.js');
load(BASEDIR + '/test/tests/18_tag_class.js');
load(BASEDIR + '/test/tests/19_tag_param.js');
load(BASEDIR + '/test/tests/20_tag_file.js');
load(BASEDIR + '/test/tests/21_tag_const.js');
load(BASEDIR + '/test/tests/22_tag_preserve.js');
load(BASEDIR + '/test/tests/23_tag_fires.js');
load(BASEDIR + '/test/tests/24_tag_exception.js');
load(BASEDIR + '/test/tests/25_tag_scope.js');


// see http://visionmedia.github.com/jspec/
JSpec.run({
	reporter: JSpec.reporters.Terminal,
	failuresOnly: true
})
.report();