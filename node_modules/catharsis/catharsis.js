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

var typeExpressionCache = {
	normal: {},
	lenient: {}
};

var parsedTypeCache = {
	normal: {},
	htmlSafe: {}
};

function getTypeExpressionCache(options) {
	if (options.useCache === false) {
		return null;
	} else if (options.lenient === true) {
		return typeExpressionCache.lenient;
	} else {
		return typeExpressionCache.normal;
	}
}

function getParsedTypeCache(options) {
	if (options.useCache === false) {
		return null;
	} else if (options.htmlSafe === true) {
		return parsedTypeCache.htmlSafe;
	} else {
		return parsedTypeCache.normal;
	}
}

function canReturnOriginalExpression(parsedType, options) {
	return options.restringify !== true && options.htmlSafe !== true &&
		Object.prototype.hasOwnProperty.call(parsedType, 'typeExpression');
}

function cachedParse(expr, options) {
	var cache = getTypeExpressionCache(options);
	var parsedType;

	if (cache && cache[expr]) {
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

		if (cache) {
			cache[expr] = parsedType;
		}

		return parsedType;
	}
}

function cachedStringify(parsedType, options) {
	var cache = getParsedTypeCache(options);
	var json;

	if (canReturnOriginalExpression(parsedType, options)) {
		return parsedType.typeExpression;
	} else if (cache) {
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
