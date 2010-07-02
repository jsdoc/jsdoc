(function() {
	var jsdoc;
	
	JSpec.describe('jsdoc/src.js', function() {
	
		before(function() {
			jsdoc = { src: require('jsdoc/src') };
		});
		
		describe('The object exported by the jsdoc/src module', function() {
			it('should be an object', function() {
				expect(jsdoc.src).to(be_an, Object);
			});
			
			it('should have a `getFilePaths` method', function() {
				expect(jsdoc.src).to(respond_to, 'getFilePaths');
			});
		});
		
		describe('The return value of jsdoc.src#getFilePaths when called with no arguments', function() {
			it('should return an empty array', function() {
				var returnedValue = jsdoc.src.getFilePaths();
				expect(returnedValue).to(be_an, Array);
				expect(returnedValue).to(have_length, 0);
			});
		});
	
 		describe('The return value of jsdoc.src#getFilePaths when called with an array with one src dir and no depth', function() {
 			it('should return an array of 2 file paths', function() {
 				var returnedValue = jsdoc.src.getFilePaths(['test/samples/src']);
 				expect(returnedValue).to(be_an, Array);
 				expect(returnedValue).to(have_length, 2);
 			});
 			
 			it('should contain both js files and not the txt file', function() {
 				var returnedValue = jsdoc.src.getFilePaths(['test/samples/src']);

 				expect( returnedValue.indexOf('test/samples/src/one.js') ).to(be_at_least, 0);
 				expect( returnedValue.indexOf('test/samples/src/two.js') ).to(be_at_least, 0);
 				expect( returnedValue.indexOf('test/samples/src/ignored.txt') ).to(be_less_than, 0);
 			});
 		});
 		
 		describe('The return value of jsdoc.src#getFilePaths when called with an array with one src dir and depth of 2', function() {
 			it('should return an array of 3 file paths', function() {
 				var returnedValue = jsdoc.src.getFilePaths(['test/samples/src'], 2);
 				expect(returnedValue).to(be_an, Array);
 				expect(returnedValue).to(have_length, 3);
 			});
			
 			it('should contain all three js files and not the txt file', function() {
 				var returnedValue = jsdoc.src.getFilePaths(['test/samples/src'], 2);

 				expect( returnedValue.indexOf('test/samples/src/one.js') ).to(be_at_least, 0);
 				expect( returnedValue.indexOf('test/samples/src/two.js') ).to(be_at_least, 0);
 				expect( returnedValue.indexOf('test/samples/src/dir1/three.js') ).to(be_at_least, 0);
 				expect( returnedValue.indexOf('test/samples/src/ignored.txt') ).to(be_less_than, 0);
 			});
 		});
 	});

})();
