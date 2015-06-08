/**
 @param {object} - The options
 @param {string} [options.something] - An option
 @param {function} - a callback invoked on completion
 */
function mixedNaming(options, callback){}

/**
 @param {object} - The options
 @param {string} .aThing - Required option
 @param {string} [.something] - Optional option
 @param {function} - a callback invoked on completion
 */
function implicitNaming(options, callback){}

/**
 @param {object} - The options
 @param {string} ...aThing - Required option
 @param {string} [...something] - An option
 @param {function} - a callback invoked on completion
 */
function dotNaming(options, callback){}

/**
 * @param {object} - The options
 * @param {string} ...aThing
 * @param {object} [...extras] - Extra options
 * @param {string} [...extras.value] - The extra value
 * @param {function} - a callback invoked on completion
 */
function nestedDotNaming(options, callback){}
