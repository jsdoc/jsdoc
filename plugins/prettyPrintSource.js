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
        
        function bs2fs(text) {
            return text.replace(/\\/g, '/');
        }
        
        function toRelativePath(text) {
            return text.replace(/^.*:/, '');
        }
        
        function slashesCollapseToDots(text) {
            return text.replace(/[\/\\]+/g, '.');
        }
        
        function suffixFsCollapse(text) {
            return text.replace(/\/+$/, '/');
        }
        
        function noDotPrefix(text) {
            return text.replace(/^\./, '');
        }
        
        function makeOutputFileName(sourceFileName, extension) {
            extension = extension || '';
            
            var out;
            
            out  = toRelativePath(sourceFileName);
            out  = slashesCollapseToDots(out);
            out  = noDotPrefix(out);
            out += extension;
            
            return out;
        }
        
        function getOutputDirectory() {
            var path = require('path');
            var out;
            
            out  = path.resolve(env.opts.destination);
            out  = bs2fs(out);
            out  = suffixFsCollapse(out + '/');
            
            return out;
        }
        
        function generateHighlightedSourceFile(outDir, outfile, sourceContent) {
            var fs = require('fs');
            var outsource;
            
            outsource  = '<!DOCTYPE html>\n';
            outsource += '  <head>\n';
            outsource += '      <meta charset="utf-8">\n';
            outsource += '      <title>Source of : ' + outfile + '</title>\n';
            outsource += '      <style type="text/css">\n';
            outsource += '          pre, code\n';
            outsource += '          {\n';
            outsource += '              white-space: pre-wrap;\n';
            outsource += '          }\n';
            outsource += '      </style>\n';
            outsource += '      <script src="scripts/prettify/prettify.js"> </script>\n';
            outsource += '      <!--[if lt IE 9]>\n';
            outsource += '          <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>\n';
            outsource += '      <![endif]-->\n';
            outsource += '      <link type="text/css" title="desert" rel="stylesheet" href="styles/desert.css">\n';
            outsource += '      <link type="text/css" title="sunburst" rel="alternate stylesheet" href="styles/sunburst.css">\n';
            outsource += '      <link type="text/css" title="prettify" rel="alternate stylesheet" href="styles/prettify.css">\n';
            outsource += '      <link type="text/css" title="prettify-jsdoc" rel="alternate stylesheet" href="styles/prettify-jsdoc.css">\n';
            outsource += '  </head>\n';
            outsource += '  <body>\n';
            outsource += '      <pre class="prettyprint lang-js linenums">\n';
            outsource += sourceContent;
            outsource += '      </pre>\n';
            outsource += '      <script>prettyPrint();</script>\n';
            outsource += '  </body>\n';
            outsource += '</html>\n';
            
            fs.mkPath(outDir);
            fs.writeFileSync(outfile, outsource);
        }
        
        function main() {
            
            var sourceFileName= bs2fs(e.filename);
            var sourceContent = e.source;
            var outFileName   = makeOutputFileName(sourceFileName, '.html');
            var outDir        = getOutputDirectory();
            var outfile       = outDir + outFileName;
            
            /*// Debug
            print('source file name = ' + sourceFileName);
            print('output file name = ' + outFileName);
            print('output directory = ' + outDir);
            print('output file      = ' + outfile);
            print('sourceContent    = ' + sourceContent);
            //*/
            
            // write source to file with a unique name
            generateHighlightedSourceFile(outDir, outfile, sourceContent);
            // link to source in documentation somehow
        }
        
        main();
    }
};