/*global env: true */
/**
 * Turn the data about your docs into file output.
 * @param {TAFFY} data A TaffyDB collection representing
 *                       all the symbols documented in your code.
 * @param {object} opts An object with options information.
 * @param {Tutorial} tutorialResolverRoot An object with information about included tutorials
 * @see http://www.taffydb.com/
 * @see http://www.taffydb.com/workingwithdata
 * @see http://underscorejs.org/#template
 * @see http://nodejs.org/api/fs.html
 * @see http://nodejs.org/api/path.html
 */
exports.publish = function(outputDirectory, outputFileName, sourceCode) {
    
    var fs                     = require('jsdoc/fs');
    var path                   = require('path');
    var helper                 = require('jsdoc/util/templateHelper');
    var template               = require('jsdoc/template');
    
    outputDirectory            = path.resolve(outputDirectory);
    
    var staticFilesDirectory   = path.resolve(__dirname + '/templates/prettyPrintSource/static');
    var outputFile             = path.join(outputDirectory, outputFileName + '.html');
    var templateName           = 'layout.tmpl';
    var templatePath           = path.resolve(__dirname + '/templates/prettyPrintSource');
    var temmplateFilesDirectory= path.join(templatePath, '/tmpl');
    var templateData           = {};
    
    templateData.title         = 'Source of : ' + outputFileName;
    templateData.sourceCode    = helper.htmlsafe(sourceCode);
    
    var view                   = new template.Template(temmplateFilesDirectory);
    var outputContent          = view.render(templateName, templateData);
    
    /*
    console.log('templateData    : ' + templateData);
    console.log('outputDirectory : ' + outputDirectory);
    console.log('outputFile      : ' + outputFile);
    console.log('outputContent   : ' + outputContent);
    */
    fs.mkPath(outputDirectory);
    fs.writeFileSync(outputFile, outputContent, 'utf8');
    
    // copy static files to outdir
    var fromDir                = path.join(templatePath, '/static');
    var staticFiles            = fs.ls(fromDir, 3);
        
    staticFiles.forEach(function(fileName) {
        var toDir              = fs.toDir(fileName.replace(fromDir, outputDirectory));
        fs.mkPath(toDir);
        if(!fs.existsSync(path.join(toDir, '/' + fileName))) {
            fs.copyFileSync(fileName, toDir);
        }
    });
    
    
};
