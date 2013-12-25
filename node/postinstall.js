#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');

var jsdocPath = path.resolve( path.join(__dirname, '..') );
var symlinkSrc = path.join( jsdocPath, 'lib', 'jsdoc' );
var symlinkDest = path.join( jsdocPath, 'node_modules', 'jsdoc' );

function createJunction(err) {
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

function checkLink() {
    fs.readlink(symlinkDest, function(readlinkErr, linkString) {
        if (!readlinkErr) {
            linkString = path.resolve(path.dirname(symlinkDest), linkString);
            if (linkString === symlinkSrc) {
                // the existing symlink points to the right place
                process.exit(0);
            }
            else {
                console.error('The symlink at %s points to %s, but it should point to %s. ' +
                    'Please remove the symlink and try again.', symlinkDest, linkString,
                    symlinkSrc);
                process.exit(1);
            }
        }
        else {
            console.error('Unable to read the symlink at %s. Please remove the symlink and try ' +
                'again', symlinkDest);
            process.exit(1);
        }
    });
}

fs.symlink(symlinkSrc, symlinkDest, 'dir', function(err) {
    if (err) {
        // Does the symlink already exist? If so, does it point to the right place?
        fs.lstat(symlinkDest, function(lstatErr, stats) {
            if ( stats && stats.isSymbolicLink() ) {
                checkLink();
            }
            // On Windows, try to create a junction instead
            else if (process.platform.indexOf('win') === 0) {
                createJunction();
            }
            else {
                console.error('Unable to create a symbolic link from %s to %s. %s\n', symlinkSrc,
                    symlinkDest, err);
                process.exit(1);
            }
        });
    }
    else {
        process.exit(0);
    }
});
