/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	Parse type expressions.
	@module jsdoc/type
 */
(function() {
	
	/**
		@param {string} tagText
		@returns {Array.<string>}
	 */
	exports.parse = function(tagText) {
		if (typeof tagText !== 'string') { tagText = ''; }
		var type = '',
			text = '',
			count = 0;
		
		// type expressions start with '{'
		if (tagText[0] === '{') {
			count++;
			
			// find matching closer '}'
			for (var i = 1, leni = tagText.length; i < leni; i++) {
				if (tagText[i] === '{') { count++; }
				else if (tagText[i] === '}') { count--; }
				
				if (count === 0) {
					type = trim(tagText.slice(1, i));
					text = trim(tagText.slice(i+1));
					break;
				}
			}
		}
		
		if (type === '') { text = tagText; }
		
		[type, optional] = parseOptional(type);
		[type, nullable] = parseNullable(type);
		
		type = parseTypes(type); // make it into an array

		return [type, text, optional, nullable];
	}
	
	function parseOptional(type) {
		var optional = null;
		
		// {sometype=} means optional
		if ( /(.+)=$/.test(type) ) {
			type = RegExp.$1;
			optional = true;
		}
		
		return [type, optional];
	}
	
	function parseNullable(type) {
		var nullable = null;
		
		// {?sometype} means nullable, {!sometype} means not-nullable
		if ( /^([\?\!])(.+)$/.test(type) ) {
			type = RegExp.$2;
			nullable = (RegExp.$1 === '?')? true : false;
		}
		
		return [type, nullable];
	}
	
	function parseTypes(type) {
		var types = [];
		
		if (type.indexOf('|') > -1) {
			// remove optional parens
			if ( /^\s*\(\s*(.+)\s*\)\s*$/.test(type) ) {
				type = RegExp.$1;
			}
			types = type.split(/\s*\|\s*/g);
		}
		else {
			types = [type];
		}
		
		return types;
	}
	
	/** @private */
	function trim(text) {
		return text.replace(/^\s+|\s+$/g, '');
	}
})();