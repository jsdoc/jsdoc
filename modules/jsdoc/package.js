/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/package
	@see http://wiki.commonjs.org/wiki/Packages/1.0
 */
(function() {
	/**
	    @class
	    @classdesc Represents a JavaScript package.
	    @param {string} json - The contents of package.json.
	 */
	exports.Package = function(json) {
	    /** The source files associated with this package.
	        @type {Array<String>}
	     */
	    this.files = [];
	    
	    /** The name of this package.
	        @default
	    */
	    this.kind = 'package';
	    
	    json = JSON.parse(json);
	    
	    /** The name of this package. */
	    this.name = json.name;
	    
	    /** The longname of this package. */
	    this.longname = this.kind + ':' + this.name;
	    
	    /** The description of this package. */
	    this.description = json.description;
	    
	    /** The version of this package. */
	    this.version = json.version;
	    
	    /** The licenses of this package.
	    
	        @example
	        "licenses": [
                {
                   "type": "GPLv2",
                   "url": "http://www.example.com/licenses/gpl.html",
                }
            ]
	    */
	    this.licenses = json.licenses;
	}

})();