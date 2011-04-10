JSDoc 3
=======

An inline API documentation processor for JavaScript. JSDoc 3 is intended to be
an upgrade to JsDoc Toolkit (JSDoc 2).

Notice
------

This software is not yet released and is still under active development.

Installation
------------

Download a copy of JSDoc 3 from the official Git Hub repository here:
<https://github.com/micmath/jsdoc>

To build the jar file that runs JSDoc 3, use the Apache ant build tool:

    cd jsdoc
    ant

This will create a file named `jsdoc.jar` in the project base directory.

To test that the newly installed app is working, execute the following:

	java -jar jsdoc.jar --test

Usage
-----

This example assumes that your working directory is the jsdoc application base
directory:

    java -jar jsdoc.jar yourSourceCodeFile.js

For help regarding the supported commandline options use the --help option.

	java -jar jsdoc.jar --help

Included with JSDoc 3 is a bash shell script that can simplify the command line
usage slightly. For example:

    ./jsdoc --help
    ./jsdoc yourSourceCodeFile.js

Dependencies
------------

JSDoc 3 utilises the Mozilla Rhino engine, which requires Java. JSDoc 3 is known
to work with version 1.6.0_24 of Java.

JSDoc 3 uses advanced features in the Rhino application which are only
available in or after Rhino 1.7 release 3. A copy of this version of Rhino is
included in JSDoc so this is not normally an issue that the user needs to be
concerned with. However, in rare cases, users may have their Java CLASSPATH
configured to override that included Rhino and point to some older version of
Rhino instead. If this is the case, simply correct the CLASSPATH to remove the
older Rhino.

The build script for JSDoc 3 requires Apache ant. It is know to work with
version 1.8.2 of ant.

See
---

Project Documentation: <http://usejsdoc.org/>
User's Group: <http://groups.google.com/group/jsdoc-users>
Subversion Mirror: <http://code.google.com/p/jsdoc/source>

License
-------

JSDoc 3 is copyright (c) 2011 Michael Mathews <micmath@gmail.com>

See file "LICENSE.md" in this distribution for more details about
terms of use.