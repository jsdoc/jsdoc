'use strict';
module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};
