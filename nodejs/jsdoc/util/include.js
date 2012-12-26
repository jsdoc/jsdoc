// TODO: not tested
module.exports = function(filepath) {
	var fs = require('fs');
	var vm = require('vm');

	var script = fs.readFileSync(filepath, 'utf8');
	vm.runInNewContext(script, global, filepath);
};
