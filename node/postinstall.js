#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');

var jsdocPath = path.resolve( path.join(__dirname, '..') );
var symlinkSrc = path.join( jsdocPath, 'lib', 'jsdoc' );
var symlinkDest = path.join( jsdocPath, 'node_modules', 'jsdoc' );

fs.symlink(symlinkSrc, symlinkDest, 'dir', function(err) {
    if (err) {
        // On Windows, try to create a junction instead
        if (process.platform.indexOf('win') === 0) {
            fs.symlink(symlinkSrc, symlinkDest, 'junction', function(junctionErr) {
                if (junctionErr) {
                    console.error('Unable to create a symbolic link or junction from %s to %s.\n' +
                        'Symbolic link result: %s\nJunction result: %s\n' +
                        'Make sure you have write privileges in the target directory. ' +
                        'You may need to run the Windows shell as an administrator.',
                        symlinkSrc, symlinkDest, err, junctionErr);
                    process.exit(1);
                }
                else {
                    process.exit(0);
                }
            });
        }
        else {
            console.error('Unable to create a symbolic link from %s to %s. %s\n',
                symlinkSrc, symlinkDest, err);
            process.exit(1);
        }
    }
    else {
        process.exit(0);
    }
});
