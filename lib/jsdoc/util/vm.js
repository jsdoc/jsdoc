/*global env: true, Packages: true */
/**
 * Helper functions for running JSDoc on multiple JavaScript VMs.
 * @module jsdoc/util/vm
 */

const RHINO = exports.RHINO = 'rhino';
const NODEJS = exports.NODEJS = 'nodejs';

exports.getVm = function() {
    if (Packages && typeof Packages === 'object' &&
        Object.prototype.toString.call(Packages) === '[object JavaPackage]') {
        return RHINO;
    } else if ( require && require.main && module && (require.main === module) ) {
        return NODEJS;
    } else {
        // unknown VM
        throw new Error('Unable to identify the current JavaScript runtime.');
    }
};

exports.isRhino = function() {
    return env.vm === RHINO;
};

exports.isNodejs = function() {
    return env.vm === NODEJS;
};
