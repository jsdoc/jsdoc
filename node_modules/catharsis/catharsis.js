/**
 * catharsis 0.4.2
 * A parser for Google Closure Compiler type expressions, powered by PEG.js.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT License <http://opensource.org/licenses/mit-license.php/>
 */

'use strict';

var parse = require('./lib/parser').parse;
var stringify = require('./lib/stringify');

var typeExpressionCache = {};
var lenientTypeExpressionCache = {};

var parsedTypeCache = {};
var lenientParsedTypeCache = {};

function cachedParse(expr, options) {
	var cache = options.lenient ? lenientTypeExpressionCache : typeExpressionCache;
	var parsedType;

	if (options.useCache !== false && cache[expr]) {
		return cache[expr];
	} else {
		parsedType = parse(expr, options);

		Object.defineProperties(parsedType, {
			typeExpression: {
				value: expr
			},
			lenient: {
				value: options.lenient === true ? true : false
			}
		});
		parsedType = Object.freeze(parsedType);

		if (options.useCache !== false) {
			cache[expr] = parsedType;
		}

		return parsedType;
	}
}

function cachedStringify(parsedType, options) {
	var cache = options.lenient ? lenientParsedTypeCache : parsedTypeCache;
	var json;

	if (options.useCache !== false && Object.prototype.hasOwnProperty.call(parsedType,
		'typeExpression')) {
		// return the original type expression
		return parsedType.typeExpression;
	} else if (options.useCache !== false) {
		json = JSON.stringify(parsedType);
		cache[json] = cache[json] || stringify(parsedType, options);
		return cache[json];
	} else {
		return stringify(parsedType, options);
	}
}

function Catharsis() {
	this.Types = require('./lib/types');
}

Catharsis.prototype.parse = function(typeExpr, options) {
	options = options || {};

	return cachedParse(typeExpr, options);
};

Catharsis.prototype.stringify = function(parsedType, options) {
	options = options || {};
	var result;

	result = cachedStringify(parsedType, options);
	if (options.validate) {
		this.parse(result, options);
	}

	return result;
};

module.exports = new Catharsis();
