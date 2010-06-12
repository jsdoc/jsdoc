(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_enum.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_enum',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testEnumDocs: function() {
			assertEqual(typeof docset, 'object');
		},
	
		testEnumCompactTag: function() {
			var doc = docset.getDocsByPath('buttons');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'buttons', 'The found doclet has the expected path.');
 			assertEqual(doc.tagText('type'), 'string', 'The found doclet has the expected type.');
 			assertEqual(doc.tagText('desc'), 'Text equivalents for editor buttons.', 'The found doclet has the expected desc.');
		},
	
		testEnumCompactMembers: function() {
			var doc = docset.getDocsByPath('replies');
			assertEqual(doc.length, 1, '1 doclet by that name replies is found.');
			
			doc = docset.getDocsByPath('replies.YES');
			assertEqual(doc.length, 1, '1 doclet by that name YES is found.');
			
			doc = doc[0];
			
			assertEqual(doc.tagText('memberof'), 'replies', 'The found doclet is a member of the enum.');
			
			doc = docset.getDocsByPath('replies.NO');
			assertEqual(doc.length, 1, '1 doclet by that name NO is found.');
		},
	
		testEnumThis: function() {
			var doc = docset.getDocsByPath('Chart#colors');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/** @enum {string} buttons Text equivalents for editor buttons. */
	this['buttons'] = { BOLD: 'B', ITALIC: 'I', CLOSE: 'X' };
	
	/**
		Valid replies.
		@enum
	 */
	var replies = {
		/** A positive response. */
		YES: 1,
		
		/** A negative response. */
		NO: -1,
		
		/** An uncertain response */
		MAYBE: 0
	}
	
	/** @constructor */
	function Chart() {
		/**
			Valid colors.
			@enum {string}
		 */
		this.colors = {
			RED:   '#F00',
			BLUE:  '#00F',
			GREEN: '#0F0'
		}
	}

}