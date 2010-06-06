(function() {
	var dumper  = require('flesler/jsdump'),
		xml     = require('goessner/json2xml'),
		doclets = exports.doclets = [];
	
	doclets.getDocsByName = function getDocsByName(docName) {
		var foundDocs = [],
			i = doclets.length;
		
		while (i--) {
			if (doclets[i].tagText('path') === docName) {
				foundDocs.unshift( doclets[i] );
			}
		}
		
		return foundDocs;
	}
	
	doclets.toObject = function toObject() {
		var docsObjects = [],
			i = doclets.length;
	
		while (i--) {
			docsObjects.unshift( doclets[i].toObject() );
		}
		
		return { doc: docsObjects };
	}
	
	doclets.asString = function asString(destinationName) {
		if ( /xml$/i.test(destinationName) ) {
			return doclets.toXML();
		}
		else { // default
			return doclets.toJSON();
		}
	}
	
	doclets.toJSON = function toJSON() {
		return dumper.jsDump.parse( doclets.toObject() );
	}
	
	doclets.toXML = function toXML() {
		var o = doclets.toObject();
		
		// make `id` an attribute of the doc tag
		for (var i = 0, leni = o.doc.length; i < leni; i++) {
			for (var p in o.doc[i]) {
				if (p === 'id') {
					o.doc[i]['@id'] = o.doc[i].id;
					delete o.doc[i].id;
				}
			}
		}
		
		return xml.convert(
			{ jsdoc: o }
		);
	}
	
})();