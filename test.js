#!/usr/bin/env node

if (typeof load !== 'undefined') {
    load('lib/rhino-shim.js');
}
    
var reporter = require('nodeunit').reporters['default'];
reporter.run(['./test']);