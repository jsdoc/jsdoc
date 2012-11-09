/*global env: true */
/**
	Helper functions for handling errors.
	@module jsdoc/util/error
 */

/**
	Handle an exception appropriately based on whether lenient mode is enabled:

	+ If lenient mode is enabled, log the exception to the console.
	+ If lenient mode is not enabled, re-throw the exception.
	@param {Error} e - The exception to handle.
	@exception {Error} Re-throws the original exception unless lenient mode is enabled.
	@memberof module:jsdoc/util/error
 */
exports.handle = function(e) {
	var msg;

	if (env.opts.lenient) {
		msg = e.message || JSON.stringify(e);

		// include the error type if it's an Error object
		if (e instanceof Error) {
			msg = e.name + ': ' + msg;
		}

		console.log(msg);
	}
	else {
		throw e;
	}
};
