/**
 * Extended version of the standard `fs` module.
 * @module jsdoc/fs
 */

var fs = require('fs');
var vm = require('jsdoc/util/vm');

var hasOwnProp = Object.prototype.hasOwnProperty;

// add the VM-specific implementations of the extra methods
// TODO: document extra methods here
var extras = vm.getModule('fs');
for (var func in extras) {
    if ( hasOwnProp.call(extras, func) ) {
        fs[func] = extras[func];
    }
}

module.exports = fs;
