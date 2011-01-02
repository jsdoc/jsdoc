/** @module jsdoc/docset */

(function() {
	var DocSet;
	exports.DocSet = DocSet = function(doclets) {
        this.doclets = doclets;
	}
	
	DocSet.prototype.getByLongname = function(longname) {
	    var found = [];
	    for (var i = 0, l = this.doclets.length; i < l; i++) {
	        if (this.doclets[i].longname === longname) {
	            found.push(this.doclets[i]);
	        }
	    }
	    return found;
	}
	
})();