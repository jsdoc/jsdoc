/*global describe: true, expect: true, it: true, xdescribe: true */

describe('module that exports a constructor', function() {
	var docSet = jasmine.getDocSetFromFile('test/fixtures/moduleisconstructor.js');
	var modules = docSet.doclets.filter(function(doclet) {
		return doclet.kind === 'module';
	});
	var classes = docSet.doclets.filter(function(doclet) {
		return doclet.kind === 'class';
	});
	
	it('should include one doclet whose kind is "module"', function() {
		expect(modules.length).toBe(1);
		expect(modules[0].kind).toBe('module');
	});
	
	it('should include one doclet whose kind is "class"', function() {
		expect(classes.length).toBe(1);
		expect(classes[0].kind).toBe('class');
	});
	
	describe('class doclet', function() {
		it('should include a "description" property that contains the constructor description', function() {
			expect(classes[0].description).toEqual('Create a new configuration.');
		});
		
		it('should include a "class-description" property', function() {
			expect(classes[0].classdesc).toEqual('Describe the class here.');
		});
	});
	
	describe('module doclet', function() {
		it('should include a "description" property that contains the module description', function() {
			expect(modules[0].description).toEqual('Describe the module here.');
		});
		
		// TODO: this is the missing piece of information -- the module property is not available when testing, but is available within the template
		xit('should be able to access the class information via the module', function() {
			expect(modules[0].module.description).toEqual('Create a new configuration.');
			expect(modules[0].module.classdesc).toEqual('Describe the class here.');
		});
	});
});