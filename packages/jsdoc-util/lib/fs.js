/**
 * @alias @jsdoc/util.fs
 */

const _ = require('lodash');
const klawSync = require('klaw-sync');
const path = require('path');
const fs = require('graceful-fs');

// Create a `skipFileErrorFs` version of `fs`. This implements a filtered
// version of `readdirSync` that skips files that will cause reading issues.
// This helps us avoid falling flat on our face for example when processing
// broken symlinks.
let skipFileErrorFs = {};

for (let fieldName in fs) {
    if (Object.prototype.hasOwnProperty.call(fs, fieldName)) {
        skipFileErrorFs[fieldName] = fs[fieldName];
    }
}

skipFileErrorFs.readdirSync = ((dirPath, options = {}) => {
    const paths = fs.readdirSync(dirPath, options);
    let ret = [];
    let stat;

    for (var i = 0; i < paths.length; i += 1) {
        const fullPath = dirPath + path.sep + paths[i];
        try {
            stat = fs.statSync(fullPath);
        } catch (e) {
            // Ignore error
            console.log('Skipping file %s due to reading error', fullPath)
            stat = null;
        }

        if (stat) {
            ret.push(paths[i]);
        }
    }

    return ret;
});

exports.lsSync = ((dir, opts = {}) => {
    const depth = _.has(opts, 'depth') ? opts.depth : -1;

    const files = klawSync(dir, {
        depthLimit: depth,
        filter: (f => !path.basename(f.path).startsWith('.')),
        nodir: true,
        fs: skipFileErrorFs
    });

    return files.map(f => f.path);
});
