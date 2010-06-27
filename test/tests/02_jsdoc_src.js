(function() {
	var jsdoc;
	
	JSpec.describe('jsdoc/src.js', function() {
	
		before_each(function() {
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
 	});

})();
