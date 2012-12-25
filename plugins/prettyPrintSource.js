/*global env: true */
/**
 * @file Adds pretty printed source code to
 * the output files.
 * @author <a href="mailto:matthewkastor@google.com">Matthew Christopher Kastor-Inare III</a>
 * Hial Atropa!!
 * @version 20121017
 */

exports.handlers = {
    beforeParse: function(e) {
        
        function backslashToForwardslash(text) {
            return text.replace(/\\/g, '/');
        }
        
        function toRelativePath(text) {
            text  = backslashToForwardslash(text);
            return text.replace(/^.*:/, '');
        }
        
        function slashesCollapseToDots(text) {
            return text.replace(/[\/\\]+/g, '.');
        }
        
        function suffixFsCollapse(text) {
            return text.replace(/\/+$/, '/');
        }
        
        function noDotPrefix(text) {
            return text.replace(/^\.+/, '');
        }
        
        function noDotSuffix(text) {
            return text.replace(/\.+$/, '');
        }
        
        function trimDots(text) {
            text  = noDotPrefix(text);
            return noDotSuffix(text);
        }
        
        function relativePathToNamespace (text) {
            text  = slashesCollapseToDots(text);
            return trimDots(text);
        }
        
        function makeOutputFileName(sourceFileName, extension) {
            extension = extension || '';
            
            sourceFileName  = toRelativePath(sourceFileName);
            sourceFileName  = relativePathToNamespace(sourceFileName);
            sourceFileName = sourceFileName += extension;
            return sourceFileName;
        }
        
        function getOutputDirectory() {
            var path = require('path');
            var out;
            
            out  = path.resolve(env.opts.destination);
            out  = backslashToForwardslash(out);
            return suffixFsCollapse(out + '/');
        }
        
        function generateHighlightedSourceFile(outputDirectory, outputFileName, sourceCode) {
            var prettyPrinter = require('templates/prettyPrintSource/publish');
            prettyPrinter.publish(outputDirectory, outputFileName, sourceCode);
        }
        
        function main() {
            var outputDirectory = getOutputDirectory();
            var outputFileName  = makeOutputFileName(e.filename);
            var sourceCode      = e.source;
            
            // write source to file with a unique name
            generateHighlightedSourceFile(outputDirectory, outputFileName, sourceCode);
            // link to source in documentation somehow
        }
        
        main();
    }
};