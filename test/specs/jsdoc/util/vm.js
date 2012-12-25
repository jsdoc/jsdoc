/*global describe: true, expect: true, it: true, xit: true */
describe("jsdoc/util/vm", function() {
    var vm = require('jsdoc/util/vm');

    it("should exist", function() {
        expect(vm).toBeDefined();
        expect(typeof vm).toEqual('object');
    });

    it("should export a 'RHINO' constant", function() {
        expect(vm.RHINO).toBeDefined();
        expect(typeof vm.RHINO).toEqual('string');
    });

    it("should export a 'NODEJS' constant", function() {
        expect(vm.NODEJS).toBeDefined();
        expect(typeof vm.NODEJS).toEqual('string');
    });

    it("should export a 'vm' property", function() {
        expect(vm.vm).toBeDefined();
        expect(typeof vm.vm).toEqual('string');
    });

    it("should export an 'isRhino' function", function() {
        expect(vm.isRhino).toBeDefined();
        expect(typeof vm.isRhino).toEqual('function');
    });

    it("should export an 'isNodejs' function", function() {
        expect(vm.isNodejs).toBeDefined();
        expect(typeof vm.isNodejs).toEqual('function');
    });


    describe("vm", function() {
        it("should match either 'vm.RHINO' or 'vm.NODEJS'", function() {
            expect(vm.vm).toEqual(vm.RHINO || vm.NODEJS);
        });

        xit("should return the correct value for the current VM", function() {
            // TODO: is there a reasonable test that doesn't just replicate getVm()?
        });
    });

    describe("isRhino", function() {
        it("should return a boolean", function() {
            expect( typeof vm.isRhino() ).toEqual('boolean');
        });

        it("should reflect the value of 'vm.vm'", function() {
            expect( vm.isRhino() ).toEqual(vm.vm === vm.RHINO ? true : false);
        });
    });

    describe("isNodejs", function() {
        it("should return a boolean", function() {
            expect( typeof vm.isNodejs() ).toEqual('boolean');
        });

        it("should reflect the value of 'vm.vm'", function() {
            expect( vm.isNodejs() ).toEqual(vm.vm === vm.NODEJS ? true : false);
        });
    });

});
