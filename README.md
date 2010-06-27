JSDoc 3
=======

This is pre-release software, under active development. It is not
intended for general use.

Install
-------

To build the jar file that runs JSDoc 3 use the ant build tool.

    $ cd ./java
    $ ant

This will create a file name `jsdoc.jar` in the project base
directory.

To test that the installed app is working, execute the following:

	$ cd ..
    $ java -jar jsdoc.jar -T

Usage
-----

This example assumes your working directory is the JSDoc 3 project
base directory...

    $ java -jar jsdoc.jar -d jsdoc.json myscript.js

See
---

Project Wiki: <http://code.google.com/p/jsdoc/w/list>

License
-------

JSDoc 3 is copyright (c) 2010 Michael Mathews <micmath@gmail.com>

See file "LICENSE.md" in this distribution for more details about
terms of use.