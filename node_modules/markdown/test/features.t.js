const test = require('test'),
      asserts = test.asserts,
      fs = require( "fs-base" ),
      markdown = require( "markdown" ),
      args = require( "system" ).args.splice( 1 );

function test_dialect( dialect, features ) {
  var path = module.resource.resolve( "features" ),
      dialect_test = exports[ "test_" + dialect ] = {};

  for ( var f in features ) {
    ( function( feature ) {
      dialect_test[ "test_" + feature ] = function() {
        var test_path = path + feature + "/";

        // grab all the test files in this feature
        var tests = fs.list( test_path );

        // filter to only the raw files
        tests = tests.filter( function( x ) x.match( /\.text$/ ) );

        // remove the extensions
        tests = tests.map( function( x ) x.replace( /\.text$/, "" ) );

        for ( var t in tests ) {
          // load the raw text
          var test_name = tests[ t ].substring( tests[ t ].lastIndexOf( "/" ) + 1 ),
              text_file = fs.rawOpen( test_path + tests[ t ] + ".text", "r" ),
              text = text_file.readWhole();
          text_file.close();

          // load the target output
          if ( fs.isFile( test_path + tests[ t ] + ".json" ) ) {
            try {
              var json_file = fs.rawOpen( test_path + tests[ t ] + ".json", "r" ),
                  json = JSON.parse( json_file.readWhole() );
              json_file.close();

              var output = markdown.toHTMLTree( text, dialect );
              asserts.same( output, json, test_name );
            }
            catch( e ) {
              asserts.ok( 0, "Failed with error on " + test_name + ": " + e );
              if ( e.stack )
                asserts.diag( e.stack );
            }
          }
          else {
            asserts.ok( 0, "No target output for " + test_name );
          }
        }
      }
    } )( features[ f ] );
  }
}

if ( require.main === module ) {
  var dialects = {};
  dialects.Gruber = [
    "blockquotes",
    "code",
    "emphasis",
    "headers",
    "horizontal_rules",
    "images",
    "linebreaks",
    "links",
    "lists"
  ];

  dialects.Maruku = dialects.Gruber.slice( 0 );
  dialects.Maruku.push( "meta", "definition_lists" );

  // TODO if dialects/features were passed on the command line, filter to them
  // if ( args.length ) {
  //   features = features.filter( function( x ) args.indexOf( x ) !== -1 );
  // }

  for ( d in dialects ) {
    test_dialect( d, dialects[ d ] );
  }

  test.runner( exports );
}
