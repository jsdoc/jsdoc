// USAGE: java -classpath ~/Scripts/js.jar org.mozilla.javascript.tools.shell.Main test.js

load('./lib/nodeunit.js');
//load('lib/jsmock.js');

load('../src/require.js');

module = typeof module === 'undefined'? {} : module;
var test = module.exports = {
    'Basic tests.': {
        'The require function should be defined.': function(t) {
            t.expect(1);
            t.equal( typeof require, 'function' );
            t.done();
        }
    },
    'The require.resolve function.': {
        'The require.resolve function should be defined.': function(t) {
            t.expect(1);
            t.equal( typeof require.resolve, 'function' );
            t.done();
        },
        'When an id starts with "./" it should resolve relative to the current working directory.': function(t) {
            t.expect(1);
            t.equal( require.resolve( './mock/foo'), toAbsolute('./mock/foo.js') );
            t.done();
        },
        'When an id starts with "./" it should resolve relative to the current running module.': function(t) {
            t.expect(1);
            require._root.unshift('./mock/bar.js');
            t.equal( require.resolve('./foo'), toAbsolute('./mock/foo.js') );
            require._root.shift();
            t.done();
        },
        'When an id does not start with "./" it should resolve relative to the cwd.': function(t) {
            t.expect(1);
            require._root.unshift('blah/one/two.js');
            t.equal( require.resolve('mock/foo'), toAbsolute('./mock/foo.js') );
            require._root.shift();
            t.done();
        }
    },
    'Resolve from package.json.': {
        'The require.resolve function should use the "main" property from package.json.': function(t) {
            t.expect(1);
            t.equal( require.resolve('./mock/bar'), toAbsolute('./mock/bar/myModuleLib/bar.js') );
            t.done();
        }
    },
    'Resolve from index file.': {
        'The require.resolve function should use the "index.js" file.': function(t) {
            t.expect(1);
            t.equal( require.resolve('./mock/zop'), toAbsolute('./mock/zop/index.js') );
            t.done();
        }
    },
    'Resolve from require.paths.': {
        'The require.resolve function should use the require.paths values.': function(t) {
            t.expect(1);
            require.paths.push('./mock');
            t.equal( require.resolve('foo'), toAbsolute('./mock/foo.js') );
            require.paths.pop();
            
            t.done();
        }
    },
    'Resolve from node_modules.': {
        'The require.resolve function should use the node_modules dir.': function(t) {
            t.expect(1);
            t.equal( require.resolve('foobar'), toAbsolute('./node_modules/foobar.js') );
            t.done();
        },
        'The require.resolve function should look for index in node_modules dir.': function(t) {
            t.expect(1);
            t.equal( require.resolve('baz'), toAbsolute('./node_modules/baz/index.js') );
            t.done();
        }
    },
    'Require from package.json.': {
        'The required module should be returned when it is listed in package.json.': function(t) {
            t.expect(3);
            var bar = require('mock/bar');
            t.equal( typeof bar, 'object' );
            t.equal( bar.name, 'bar' );
            t.equal( bar.extras.name, 'extras' );
            t.done();
        },
        'The required dot-relative module should be returned when it is listed in package.json.': function(t) {
            t.expect(2);
            var bar = require('./mock/bar');
            t.equal( typeof bar, 'object' );
            t.equal( bar.name, 'bar' );
            t.done();
        }
    }
};

var SLASH = Packages.java.io.File.separator;
function toAbsolute(relPath) {
    return String (new java.io.File(relPath).getAbsolutePath()).replace(/(\/|\\)[^\/\\]+\/\.\.(\/|\\)/g, SLASH).replace(/(\/|\\)\.(\/|\\)/g, SLASH);
}

nodeunit.run(test);