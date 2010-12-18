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


If the module Identifier contain [unsafe characters](../unsafe-characters.md) you must quote the name in any [doc refernces](../doc-references.md) to that module.

    /** @module ./utils.strings */
    define('./utils.strings',
        function() {
            return { };
        }
    );
    
    /**
     * @module url/parser
     * @requires module:"./utils.strings"
     */
    define('./utils.strings',
        ['./utils.strings'],
        function(strings) {
            return { };
        }
    );

Notice that in the example above the module identified as "./utils.strings" has dot characters in its name. So the name must be quoted in the subsequent `@requires` tag.

See
---
* [@requires](requires.md)
* [Documenting CommonJS Modules](../commonjs.md)

[1]: http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers

