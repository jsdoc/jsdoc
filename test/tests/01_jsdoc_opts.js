(function() {
	var jsdoc;
	
	JSpec.describe('jsdoc/opts.js', function() {
	
		before(function() {
			jsdoc = { opts: require('jsdoc/opts') };
		});
		
		describe('The object exported by the jsdoc/opts module', function() {
			it('should be an object', function() {
				expect(jsdoc.opts).to(be_an, Object);
			});
			
			it('should have a set method', function() {
				expect(jsdoc.opts).to(respond_to, 'set');
			});
		});
		
		describe('The jsdoc.opts#set method', function() {
			it('should return an object', function() {
				var returnedValue = jsdoc.opts.set('main.js');
				expect(returnedValue).to(be_an, Object);
			});
		});
		
		describe('The return value of jsdoc.opts#set when called with no arguments', function() {
			it('should have a property named `destination`', function() {
				var returnedValue = jsdoc.opts.set();
				expect(returnedValue).to(have_property, 'destination', 'jsdoc.xml');
			});
			
			it('should have a property named `template`', function() {
				var returnedValue = jsdoc.opts.set();
				expect(returnedValue).to(have_property, 'template', 'default');
			});
			
			it('should have a property named `_`', function() {
				var returnedValue = jsdoc.opts.set();
				expect(returnedValue).to(have_property, '_');
			});
		});
		
		describe('The default value for the property named `opts._`', function() {
			it('should be an empty array', function() {
				var returnedValue = jsdoc.opts.set();
				expect(returnedValue._).to(be_a, Array);
				expect(returnedValue._).to(have_length, 0);
			});
		});
		
		//// setting the destination option
		describe('The return value of jsdoc.opts#set when called with `["-d", "foo/bar.json"]`', function() {
			it('should have a property `destination` set to "foo/bar.json"', function() {
				var returnedValue = jsdoc.opts.set(['-d', 'foo/bar.json']);
				expect(returnedValue.destination).to(be, 'foo/bar.json');
      		});
		});
		
		describe('The return value of jsdoc.opts#set when called with `["--destination", "flib/flub.json"]`', function() {
			it('should have a property `destination` set to "flib/flub.json"', function() {
				var returnedValue = jsdoc.opts.set(['--destination', 'flib/flub.json']);
				expect(returnedValue.destination).to(be, 'flib/flub.json');
      		});
		});
		
		describe('The return value of jsdoc.opts#set when called with `["-d", ""]`', function() {
			it('should have a property `destination` set to ""', function() {
				var returnedValue = jsdoc.opts.set(['-d', '']);
				expect(returnedValue.destination).to(be, '');
      		});
		});
		
		//// setting the template option
		describe('The return value of jsdoc.opts#set when called with `["-t", "mytemplate"]`', function() {
			it('should have a property `template` set to "mytemplate"', function() {
				var returnedValue = jsdoc.opts.set(['-t', 'mytemplate']);
				expect(returnedValue.template).to(be, 'mytemplate');
      		});
		});
		
		describe('The return value of jsdoc.opts#set when called with `["--template", "mytemplate"]`', function() {
			it('should have a property `template` set to "mytemplate"', function() {
				var returnedValue = jsdoc.opts.set(['--template', 'mytemplate']);
				expect(returnedValue.template).to(be, 'mytemplate');
      		});
		});
		
		//// setting the _ option
		describe('The return value of jsdoc.opts#set when called with `["one", "two"]`', function() {
			it('should have a property `_` set to ["one", "two"]', function() {
				var returnedValue = jsdoc.opts.set(["one", "two"]);
				expect(returnedValue._).to(eql, ["one", "two"]);
      		});
		});
	});

})();
