The @module Tag
===============

Description
-----------

Used to document a CommonJS module.

Syntax
------

    @module moduleId

* moduleId (required) - The [CommonJs module identifer][1] for this module.

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
* module:webui/utils.twiddle



[1]: http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers