var markdown = require('Markdown');

function clone_array( input ) {
  eval( "var tmp = " + input.toSource() );
  return tmp;
}

tests = {
  test_arguments_untouched: function() {
    var input = "A [link][id] by id.\n\n[id]: http://google.com",
        tree = markdown.parse( input ),
        clone = clone_array( tree );


    var output = markdown.toHTML( tree );

    asserts.same( tree, clone, "tree isn't modified" );
    // We had a problem where we would acidentally remove the references
    // property from the root. We want to check the output is the same when
    // called twice.
    asserts.same( markdown.toHTML( tree ), output, "output is consistent" );
  }
}

if (require.main === module) {
  var asserts = require('test').asserts;
  require('test').runner(tests);
}
