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
    
    var fs                 = require('fs');
    var path               = require('path');
    var helper             = require('jsdoc/util/templateHelper');
    var template           = require('jsdoc/template');
    
    outputDirectory        = path.resolve(outputDirectory);
    var outputFile         = path.join(outputDirectory, outputFileName + '.html');
    var templateName       = 'layout.tmpl';
    var templatePath       = path.resolve(env.dirname + '/templates/prettyPrintSource/tmpl');
    var templateData       = {};
    templateData.title     = 'Source of : ' + outputFileName;
    templateData.sourceCode= helper.htmlsafe(sourceCode);
    
    
    
    var view               = new template.Template(templatePath);
    var outputContent      = view.render(templateName, templateData);
    
    /*
    console.log('templateData    : ' + templateData);
    console.log('outputDirectory : ' + outputDirectory);
    console.log('outputFile      : ' + outputFile);
    console.log('outputContent   : ' + outputContent);
    */
    fs.mkPath(outputDirectory);
    fs.writeFileSync(outputFile, outputContent);
};
