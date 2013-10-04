/**
 * Extended version of the standard `fs` module.
 * @module jsdoc/fs
 */

var fs = exports.fs = require('fs');
var vm = require('jsdoc/util/vm');

// export the VM-specific implementations of the extra methods
// TODO: document extra methods here
var extras = vm.getModule('fs');
Object.keys(extras).forEach(function(extra) {
    exports[extra] = extras[extra];
});
