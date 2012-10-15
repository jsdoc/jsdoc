/*global env: true */
/**
    @overview
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
    Make the contents of a README file available to include in the output.
	@module jsdoc/readme
	@author Michael Mathews <micmath@gmail.com>
    @author Ben Blank <ben.blank@gmail.com>
 */

var fs = require('fs'),
    conf = env.conf.markdown;

function getParser(parser, conf) {
    conf = conf || {};

    if (parser === 'gfm') {
        parser = new (require('gfm/showdown').Converter)();
        parser.githubRepoOwner = conf.githubRepoOwner;
        parser.githubRepoName = conf.githubRepoName;
        parser.hardwrap = !!conf.hardwrap;

        return function(source) {
            return parser.makeHtml(source);
        };
    }
    else if (parser === 'evilstreak') {
        parser = require('evilstreak/markdown');

        return function(source) {
            return parser.renderJsonML(parser.toHTMLTree(source, conf.dialect));
        };
    }
    else {
        throw 'unknown Markdown parser: "' + parser + '"';
    }
}

/**
    @class
    @classdesc Represents a README file.
    @param {string} path - The filepath to the README.
 */
function ReadMe(path) {
    var content = fs.readFileSync(path),
        parse;
    
    // determine which parser should be used based on configuration options, if any
    if (conf && conf.parser) {
        parse = getParser(conf.parser, conf);
    } else if (conf && conf.githubRepoOwner && conf.githubRepoName) {
        // use GitHub-friendly parser if GitHub-specific options are present
        parse = getParser('gfm', conf);
    } else {
        // evilstreak is the default parser
        parse = getParser('evilstreak', conf);
    }
    
    this.html = parse(content);
    
}

module.exports = ReadMe;
