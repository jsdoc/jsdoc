
describe("include", function() {
    
    it("should be a function", function() {
        expect(include).toBeDefined();
        expect(typeof include).toEqual('function');
    });
    
    it("should have a static method named resolve", function() {
        expect(include.resolve).toBeDefined();
        expect(typeof include.resolve).toEqual('function');
    });
    
    it("should resolve absolute filepaths to themselves", function() {
        expect( include.resolve('/a/b/c.js') ).toEqual('/a/b/c.js');
    });
    
    it("should resolve relative filepaths relative to the env.dirname", function() {
        expect( include.resolve('a/b/c') ).toEqual(env.dirname+'/'+'a/b/c');
    });
    
});