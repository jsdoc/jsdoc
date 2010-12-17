(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@param', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_param.js');

			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with two param tags', function() {
 			it('should have an `param` property that is an array of length 2', function() {
 				var doclet = doclets[0];
 				expect(doclet).to(have_property, 'param');
 				expect(doclet.param).to(be_an, Array);
 				expect(doclet.param).to(have_length, 2);
 			});
 		});
 		
 		describe('A doclet with a param tag whose value is a simple string like "address"', function() {
 			it('should have an `param` property with a `name` set to "address', function() {
 				var doclet = doclets[0];
 				expect(doclet.param[0]).to(have_property, 'name');
 				expect(doclet.param[0].name).to(eql, 'address');
 				expect(doclet.param[1]).to(have_property, 'name');
 				expect(doclet.param[1].name).to(eql, 'message');
 			});
 			
 			it('should not have a `type` or `description` property ', function() {
 				var doclet = doclets[0];
 				expect(doclet.param[0].type).to(be_undefined);
 				expect(doclet.param[0].description).to(be_undefined);
 				expect(doclet.param[1].type).to(be_undefined);
 				expect(doclet.param[1].description).to(be_undefined);
 			});
 		});
 		
 		describe('A doclet with a param tag whose value is a type specifier like {string}', function() {
 			it('should have a `param` property with a `type` set to "string"', function() {
 				var doclet = doclets[1];
 				expect(doclet).to(have_property, 'param');
 				expect(doclet.param).to(have_length, 2);
 				expect(doclet.param[0]).to(have_property, 'type');
 				expect(doclet.param[0].type).to(eql, 'string');
 				expect(doclet.param[1]).to(have_property, 'type');
 				expect(doclet.param[1].type).to(eql, 'string');
 			});
 		});
 		
 		describe('A doclet with one param tag', function() {
 			it('should have a `param` property that is an array', function() {
 				var doclet = doclets[2];
 				expect(doclet).to(have_property, 'param');
 				expect(doclet.param).to(be_an, Array);
 			});
 		});
 		
 		describe('A doclet with one param tag having a type and a name', function() {
 			it('should have a `param` array with a single member with a `type` and `name`', function() {
 				var doclet = doclets[2];
 				expect(doclet).to(have_property, 'param');
 				expect(doclet.param[0].type.push).to(be_undefined); // types are only arrays when there are many
 				expect(doclet.param[0].type).to(eql, 'string');
 				expect(doclet.param[0].name).to(be_an, String);
 				expect(doclet.param[0].name).to(eql, 'str');
 			});
 			
 			it('should not have a `description`', function() {
 				var doclet = doclets[2];
 				expect(doclet.param.description).to(be_undefined);
 			});
 		});
 		
 		describe('A doclet with one param tag having a type, name and a description', function() {
 			it('should have a `param` array with a single member with a `type`, `name` and `description`', function() {
 				var doclet = doclets[3];
 				expect(doclet).to(have_property, 'param');
 				expect(doclet.param[0].type).to(eql, 'string');
 				expect(doclet.param[0].name).to(be_an, String);
 				expect(doclet.param[0].name).to(eql, 'message');
 				expect(doclet.param[0].description).to(be_an, String);
 				expect(doclet.param[0].description).to(eql, 'the message to encrypt.');
 			});
 		});
		
		describe('A  param tag using the dash syntax with a `type`, `name` and `description`', function() {
 			it('should have a `type`, `name` and `description`', function() {
 				var param = doclets[4].param[0];
 				expect(param.type).to(eql, 'Panel');
 				expect(param.name).to(be_an, String);
 				expect(param.name).to(eql, 'p');
 				expect(param.description).to(be_an, String);
 				expect(param.description).to(eql, 'The panel to update.');
 			});
 		});
 		
 		describe('A  param tag using the dash syntax with just a `description`', function() {
 			it('should have a `description` but no `type` or `name`', function() {
 				var param = doclets[4].param[1];
 				expect(param.description).to(be_an, String);
 				expect(param.description).to(eql, 'The new content.');
 				expect(param.name).to(be_undefined);
 				expect(param.type).to(be_undefined);
 			});
 		});
 		
 		describe('A  param tag using the dash syntax with a `type` and a `description`', function() {
 			it('should have a `description` and `type` but no `name`', function() {
 				var param = doclets[4].param[2];
 				expect(param.type).to(be_an, String);
 				expect(param.type).to(eql, 'boolean');
 				expect(param.description).to(be_an, String);
 				expect(param.description).to(eql, 'Don\'t replace existing content.');
 				expect(param.name).to(be_undefined);
 			});
 		});
		
	});
})();
