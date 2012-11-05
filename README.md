JSDoc 3
=======

An inline API documentation processor for JavaScript. JSDoc 3 is intended to be
an upgrade to JsDoc Toolkit (JSDoc 2).

Want to contribute to JSDoc? Please read `CONTRIBUTING.md`.


Installation
------------

Download a copy of JSDoc 3 from the official GitHub repository:
https://github.com/jsdoc3/jsdoc

Or if you have Node.js installed, use npm:

    npm install -g git://github.com/jsdoc3/jsdoc.git

**Note**: Although you can install JSDoc with npm, JSDoc does not currently run
on Node.js.


Usage
-----

This example assumes that your working directory is the jsdoc application base
directory:

    ./jsdoc yourSourceCodeFile.js

For information about the supported command-line options, use the `--help`
option.

    ./jsdoc --help

Generated documentation will appear in the folder specified by the
`--destination` option, or in a folder named "out" by default.


Dependencies
------------

JSDoc 3 uses the Mozilla Rhino engine, which requires Java. JSDoc 3 is known to
work with version 1.6.0_24 of Java.

JSDoc 3 uses advanced features in Mozilla Rhino that are only available in or
after version 1.7R3. In addition, JSDoc 3 requires several customizations to the
standard Rhino distribution. The customized version of Rhino is included with
JSDoc.

In rare cases, users may have their Java CLASSPATH configured to override the
included Rhino and point to an older version of Rhino instead. If this is the
case, simply correct the CLASSPATH to remove the older Rhino.

The version of Rhino distributed with JSDoc 3 can be found here:
https://github.com/hegemonic/rhino


Debugging
---------

Rhino is not always very friendly when it comes to reporting errors in
JavaScript. Luckily, it comes with a full-on debugger included that can be much
more useful than a simple stack trace. To invoke JSDoc with the debugger, run
the following command on Windows:

    jsdoc --debug

Or on OS X, Linux, and other POSIX-compliant systems:

    ./jsdoc --debug

If you can't get the short-form commands to work, try invoking Java directly:

    java -cp lib/js.jar org.mozilla.javascript.tools.debugger.Main \
    -debug -modules node_modules -modules rhino_modules -modules . \
    jsdoc.js your/script.js

Note: `--debug` must be the first argument to the short-form command.

This will open a debugging window. Click Debug > Break on Exceptions, then click
Run. If there is an error, you should see exactly where it is in the source
code.


See Also
--------

Project Documentation: <http://usejsdoc.org/> (under development)  
Project Documentation Source: <https://github.com/jsdoc3/jsdoc3.github.com>  
JSDoc User's Group: <http://groups.google.com/group/jsdoc-users>  
JSDoc 3 Ant Task: <https://github.com/jannon/jsdoc3-ant-task>  
Project Announcements: <http://twitter.com/jsdoc3>


License
-------

JSDoc 3 is copyright (c) 2011-2012 Michael Mathews <micmath@gmail.com>.

JSDoc 3 is free software, licensed under the Apache License, Version 2.0. See
the file `LICENSE.md` in this distribution for more details.
