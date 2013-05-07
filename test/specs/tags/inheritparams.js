describe("@inheritparams tag", function(){
    var docSet = jasmine.getDocSetFromFile('test/fixtures/inheritparams.js'),
        shape  = docSet.getByLongname('Shape')[0],
        circle = docSet.getByLongname('Circle')[0];

    it('Circle should have inherited the \'config.fill\' parameter from Shape', function(){
        shape_param = shape.params.filter(function(param){
            if (param.name = 'config.fill') return true;
        })[0];

        circle_param = circle.params.filter(function(param){
            if (param.name = 'config.fill') return true;
        })[0];

        expect(shape_param).toEqual(circle_param);
    });

    it('Circle should have exactly 3 parameters', function(){
        expect(circle.params.length).toBe(3);
    });
});