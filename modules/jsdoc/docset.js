/** @module jsdoc/docset */

(function() {
	var DocSet;
	exports.DocSet = DocSet = function(doclets) {
        this.doclets = doclets;
	}
	
	DocSet.prototype.getByLongname = function(longname) {
	    return this.doclets.filter(function(doclet) {
	        return doclet.longname === longname;
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
	
})();