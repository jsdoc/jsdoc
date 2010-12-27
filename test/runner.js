// include('test/tests/01_jsdoc_opts.js');
// include('test/tests/02_jsdoc_src.js');
// include('test/tests/03_jsdoc_parser.js');
// include('test/tests/04_jsdoc_docset.js');
// include('test/tests/05_jsdoc_doclet.js');
// include('test/tests/06_jsdoc_tag.js');
// include('test/tests/07_jsdoc_resolvefunc.js');
// include('test/tests/07_jsdoc_resolvefunc_2.js');
// include('test/tests/07_jsdoc_resolvevar.js');
// include('test/tests/08_tag_name.js');
// include('test/tests/09_tag_desc.js');
// include('test/tests/10_tag_constructor.js');
// include('test/tests/11_tag_namespace.js');
// include('test/tests/12_tag_property.js');
// include('test/tests/13_tag_method.js');
// include('test/tests/14_tag_member.js');
// include('test/tests/15_tag_type.js');
// include('test/tests/16_tag_return.js');
// include('test/tests/17_tag_example.js');
// include('test/tests/18_tag_class.js');
// include('test/tests/19_tag_param.js');
// include('test/tests/20_tag_file.js');
// include('test/tests/21_tag_const.js');
// include('test/tests/22_tag_preserve.js');
// include('test/tests/23_tag_fires.js');
// include('test/tests/24_tag_exception.js');
// include('test/tests/25_tag_scope.js');
// include('test/tests/26_tag_tag.js');
// include('test/tests/27_tag_module.js');
// include('test/tests/28_tag_requires.js');

var assert = require('common/assert');

var passCount = 0,
    failCount = 0,
    errorLog = [];

function test(description, f) {
    try {
        f();
        passCount++;
    }
    catch(e) {
        errorLog.push(description + '\n' + (e.message||'') + '\n     - Expected: ' + e.expected + '\n     - Actual:   ' + e.actual);
        failCount++;
    }
}

function report() {
    print('\033[032mPASSED: ' + passCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
    if (failCount) {
        print('\033[031mFAILED: '+ failCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
        for (var i = 0, leni = errorLog.length; i < leni; i++) {
            print(' ' + (i+1) + '. ' + (i+1 < 10? ' ' : '') + (errorLog[i]||'') + '\n');
        }
    }
}

// test files
include('test/t/common/dumper.js');
include('test/t/jsdoc/opts/parser.js');
include('test/t/jsdoc/src/parser.js');

report();
