The @module Tag
===============

Description
-----------

Used to document a CommonJS module.

Syntax
------

    @module moduleId

* moduleId (required) - The CommonJs module identifer for this module.

Example
-------

    /**
     * @module webui/utils
     */
    
    /**
     * @method
     */
    exports.twiddle = function() {
    }

Creates docs for:

* module:webui/utils
* module:webui/utils.method:twiddle