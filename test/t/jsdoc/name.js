
var name = app.jsdoc.name;

test('The name module is defined.', function() {
    assert.notEqual(typeof name, 'undefined', 'The name module should not be undefined.');
    assert.equal(typeof name, 'object', 'The name module should be an object.');
});

test('The name module exports a "applyNamespace" function.', function() {
    assert.notEqual(typeof name.applyNamespace, 'undefined', 'The name.applyNamespace method should not be undefined.');
    assert.equal(typeof name.applyNamespace, 'function', 'The name.applyNamespace method should be a function.');
});

test('The name.applyNamespace function should insert the namespace in the correct place.', function() {
    var startName = 'lib.Panel#open',
        endName = name.applyNamespace(startName, 'event');
    
    assert.equal(endName, 'lib.Panel#event:open', 'The namespace should be inserted only before the shortname.');
    
    startName = 'flipout';
    endName = name.applyNamespace(startName, 'event');
    
    assert.equal(endName, 'event:flipout', 'The namespace should be inserted before simple name.');
    
    startName = 'foo."i.have~many#parts!"';
    endName = name.applyNamespace(startName, 'event');
    
    assert.equal(endName, 'foo.event:"i.have~many#parts!"', 'The namespace should be inserted before a quoted shortname.');
});

test('The name.applyNamespace function should not add more than one namespace.', function() {
    var startName = 'lib.Panel#event:open',
        endName = name.applyNamespace(startName, 'event');
    
    assert.equal(endName, 'lib.Panel#event:open', 'The namespace should not be inserted twice.');
});
