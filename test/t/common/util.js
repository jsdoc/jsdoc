var common = {util: require('common/util')};

test('The common/util module is defined.', function() {
    assert.notEqual(typeof common.util, 'undefined', 'The common/util module should be defined.');
    assert.equal(typeof common.util, 'object', 'The common/util module should be an object.');
});

test('The common/util module exports a "mixin" function.', function() {
    assert.notEqual(typeof common.util.mixin, 'undefined', 'The common/util.toObject member should be defined.');
    assert.equal(typeof common.util.mixin, 'function', 'The common/util.toObject member should be a function.');
});

test('The common/util.mixin function mixes in an object into another.', function() {
    var one = {a: 1, b: 2},
        two = {b: 3, c: 4};
    
    var three = common.util.mixin(one, two);
    
    assert.deepEqual( three, {a: 1, b: 3, c: 4} );
});
