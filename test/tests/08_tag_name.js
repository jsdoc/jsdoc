(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@name', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/08_tag_name.js');
			doclets = jsdoc.parser.result;
		});
		
  		describe('A doclet that has a @name tag followed by a simple string', function() {
  			it('should have an `name` property set to that string', function() {
  				var doclet = doclets[0].toObject();
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'Tipsy');
  			});
  		});
  		
  		describe('A doclet that has a @name tag followed by a dotted string', function() {
  			it('should have an `name` property set to the last segment of that string', function() {
  				var doclet = doclets[1].toObject();
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'LaLa');
  			});
  		});
  		
  		describe('A doclet that has a @name tag followed by a dotted string with quotes', function() {
  			it('should have an `name` property set to the last entire quoted segment of that string', function() {
  				var doclet = doclets[2].toObject();
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, '"and.don\'t.forget#Po!"');
  			});
  		});
  		
  		describe('A doclet that has a @name tag followed by a number', function() {
  			it('should have an `name` property set to the number', function() {
  				var doclet = doclets[3].toObject();
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, '0');
  			});
  		});
	});
})();

(function testarea() {

	/**
		@name Tipsy
		@kind property
	*/
	
	/**
		@name Tubbie.LaLa
		@kind property
	*/
	
	/**
		@name Tubbie."and.don't.forget#Po!"
		@kind property
	*/
	
	/**
		@name Custards.0
		@kind property
	*/
	
})();