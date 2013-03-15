'use strict';

var Types = require('./types');

function Stringifier() {
	// in a list of function signature params, repeatable params are stringified differently
	this._inFunctionSignatureParams = false;
}

Stringifier.prototype.applications = function(applications, options) {
	if (!applications) {
		return '';
	}

	var parsedApplications = [];
	var result = '';

	for (var i = 0, l = applications.length; i < l; i++) {
		parsedApplications.push(this.type(applications[i]));
	}

	if (options.htmlSafe) {
		result = '.&lt;';
	} else {
		result = '.<';
	}

	result += parsedApplications.join(', ') + '>';

	return result;
};

Stringifier.prototype.elements = function(elements) {
	if (!elements) {
		return '';
	}

	var result = [];

	for (var i = 0, l = elements.length; i < l; i++) {
		result.push(this.type(elements[i]));
	}

	return '(' + result.join('|') + ')';
};

Stringifier.prototype.name = function(name) {
	return name || '';
};

Stringifier.prototype['new'] = function(funcNew) {
	return funcNew ? 'new:' + this.type(funcNew) : '';
};

Stringifier.prototype.nullable = function(nullable) {
	switch (nullable) {
		case true:
			return '?';
		case false:
			return '!';
		default:
			return '';
	}
};

Stringifier.prototype.optional = function(optional) {
	/*jshint boss: true */	// TODO: remove after JSHint releases the fix for jshint/jshint#878
	if (optional === true) {
		return '=';
	} else {
		return '';
	}
};

Stringifier.prototype.params = function(params) {
	if (!params || params.length === 0) {
		return '';
	}

	var result = [];

	var param;
	for (var i = 0, l = params.length; i < l; i++) {
		result.push(this.type(params[i]));
	}

	return result.join(', ');
};

Stringifier.prototype.properties = function(props) {
	if (!props) {
		return '';
	}

	var result = [];

	for (var i = 0, l = props.length; i < l; i++) {
		result.push(this._formatNameAndType(props[i].name, props[i].type));
	}

	return result;
};

Stringifier.prototype.result = function(result) {
	return result ? ': ' + this.type(result) : '';
};

Stringifier.prototype['this'] = function(funcThis) {
	return funcThis ? 'this:' + this.type(funcThis) : '';
};

Stringifier.prototype.type = function(type, options) {
	if (!type) {
		return '';
	}
	options = options || {};

	// nullable comes first
	var result = this.nullable(type.nullable);

	// next portion varies by type
	switch(type.type) {
		case Types.AllLiteral:
			result += this._formatNameAndType(type, '*');
			break;
		case Types.FunctionType:
			result += this._signature(type);
			break;
		case Types.NullLiteral:
			result += this._formatNameAndType(type, 'null');
			break;
		case Types.RecordType:
			result += this._record(type);
			break;
		case Types.TypeApplication:
			result += this.type(type.expression);
			result += this.applications(type.applications, options);
			break;
		case Types.UndefinedLiteral:
			result += this._formatNameAndType(type, 'undefined');
			break;
		case Types.TypeUnion:
			result += this.elements(type.elements);
			break;
		case Types.UnknownLiteral:
			result += this._formatNameAndType(type, '?');
			break;
		default:
			result += this._formatNameAndType(type);
	}

	// finally, optionality
	result += this.optional(type.optional);

	return result;
};

Stringifier.prototype.stringify = Stringifier.prototype.type;

Stringifier.prototype.key = Stringifier.prototype.type;

Stringifier.prototype._record = function(type) {
	var fields = this._recordFields(type.fields);

	return '{' + fields.join(', ') + '}';
};

Stringifier.prototype._recordFields = function(fields) {
	if (!fields) {
		return '';
	}

	var result = [];

	var field;
	var keyAndValue;

	for (var i = 0, l = fields.length; i < l; i++) {
		field = fields[i];

		keyAndValue = this.key(field.key);
		keyAndValue += field.value ? ': ' + this.type(field.value) : '';

		result.push(keyAndValue);
	}

	return result;
};

function combineNameAndType(nameString, typeString) {
	var separator = (nameString && typeString) ? ':' : '';
	return nameString + separator + typeString;
}

Stringifier.prototype._formatRepeatable = function(nameString, typeString) {
	var open = this._inFunctionSignatureParams ? '...[' : '...';
	var close = this._inFunctionSignatureParams ? ']' : '';

	return open + combineNameAndType(nameString, typeString) + close;
};

Stringifier.prototype._formatNameAndType = function(type, literal) {
	var nameString = type.name || literal || '';
	var typeString = type.type ? this.type(type.type) : '';

	if (type.repeatable === true) {
		return this._formatRepeatable(nameString, typeString);
	} else {
		return combineNameAndType(nameString, typeString);
	}
};

Stringifier.prototype._signature = function(type) {
	var params = [];
	var param;
	var result;

	// these go within the signature's parens, in this order
	var props = [
		'new',
		'this',
		'params'
	];
	var prop;

	this._inFunctionSignatureParams = true;
	for (var i = 0, l = props.length; i < l; i++) {
		prop = props[i];
		param = this[prop](type[prop]);
		if (param.length > 0) {
			params.push(param);
		}
	}
	this._inFunctionSignatureParams = false;

	result = 'function(' + params.join(', ') + ')';
	result += this.result(type.result);

	return result;
};


module.exports = function(type, options) {
	return new Stringifier().stringify(type, options);
};
