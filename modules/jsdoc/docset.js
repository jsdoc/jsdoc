/** @module jsdoc/docset */

// TODO: this module is currently only ever used as a helper in the test runner
// Can it be refactored a=out of the source code?

(function() {
	var DocSet = exports.DocSet = function(doclets) {
        this.doclets = doclets;
	}
	
	DocSet.prototype.getByLongname = function(longname) {
	    return this.doclets.filter(function(doclet) {
	        return (doclet.longname || doclet.name) === longname;
	    });
	}
	
	DocSet.prototype.getByMemberof = function(memberof) {
	    return this.doclets.filter(function(doclet) {
	        return doclet.memberof === memberof;
	    });
	}
	
	DocSet.prototype.sortByLongname = function() {
	    this.doclets.sort(function(a, b) {
	        if(a.longname == b.longname) {
			    return 0;
		    }

		    return (a.longname < b.longname)? -1 : 1;
	    });
	}
	
	DocSet.prototype.hasDoc = function(longname) {
	    return !! (this.getByLongname(longname)).length;
	}
	
})();