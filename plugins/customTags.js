/**
    @overview Define custom tags for Cesium
    @module plugins/customTags
    @author Kristian Calhoun <kristian.calhoun@gmail.com>
 */

exports.defineTags = function(dictionary) {

	dictionary.defineTag('enumeration', {
        onTagged: function(doclet, tag) {
            doclet.addTag('kind', 'class');
        }
    });
	
	dictionary.defineTag('performance', {
		mustHaveValue: true,
        onTagged: function(doclet, tag) {
            if (!doclet.performance) { doclet.performance = []; }
            doclet.performance.push(tag.value);
        }
    });
	
	dictionary.defineTag('glsl', {
		onTagged: function(doclet, tag) {
			doclet.addTag('kind', 'glsl');
			doclet.filename = doclet.name;
		}
	}).synonym('glslStruct').synonym('glslUniform').synonym('glslConstant').synonym('glslFunction');
};