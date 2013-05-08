describe("@inheritparams tag", function(){
    var docSet = jasmine.getDocSetFromFile('test/fixtures/inheritparams.js'),
        shape  = docSet.getByLongname('Shape')[0],
        circle = docSet.getByLongname('Circle')[0],
        bgshape = docSet.getByLongname('BackgroundShape')[0],
        placeholdershape = docSet.getByLongname('PlaceholderShape')[0],
        inheritsnoparams = docSet.getByLongname('InheritsNoParams')[0];

    it('Circle should have inherited the \'config.fill\' parameter from Shape', function(){
        var shape_param = shape.params.filter(function(param){
            if (param.name == 'config.fill') return true;
        })[0];

        var circle_param = circle.params.filter(function(param){
            if (param.name == 'config.fill') return true;
        })[0];

        expect(circle_param.inherited).toBe(true);
        delete(circle_param.inherited);
        expect(shape_param).toEqual(circle_param);
    });

    it('Inherited values should be overridable, and not create duplicates.', function(){
        var bgshape_params = bgshape.params.filter(function(param){
            if(param.name == 'config.fill') return true;
        });

        var shape_param = shape.params.filter(function(param){
            if (param.name == 'config.fill') return true;
        })[0];

        expect(bgshape_params.length).toBe(1); // No duplicates
        expect(bgshape_params[0]).not.toEqual(shape_param);
    });

    it('Inheriting parameters to an object without parameters should not cause exceptions', function(){
        placeholdershape.params.forEach(function(param){
            expect(param.inherited).toBe(true);
            delete param.inherited;
        });
        expect(placeholdershape.params).toEqual(shape.params);
    });

    it('Attempting to inherit non-existing parameters should not cause exceptions', function(){
        expect(inheritsnoparams.params.length).toBe(1);
    });

    it('Circle should have exactly 3 parameters', function(){
        expect(circle.params.length).toBe(3);
    });

    it('Shape should have exactly 2 parameters', function(){
        expect(shape.params.length).toBe(2);
    });
});
