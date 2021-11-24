/**
 * <h5>Allows linking external docs.</h5>
 * 
 * 
 * <p>
 * 
 * When this module is active, a property named 'outerdocs' should be defined in {@link module:jsdoc/env jsdoc/env }. That module is a {@link outerDocsConfig}, which is set of externalNamespaceConfigs. The unique key which references each {@link externalNamespaceConfig} is the same key that will be passed to the @ outerdocs tag.
 * 
 * </p><p>
 * 
 * Each time an outerdocs tag is found, a url is created based on the value passed to the outerdocs tag and the corresponding externalNameSpaceConfig settings.
 * 
 * The external namespace reference is the portion of the tag.value before the first period, if there is one.
 * 
 * 
 * </p><p>
 * 
 * <p>
 * 
 * For example: 
 * 
 * <table>
 * <tr>
 *  <th>tag.value</th>
 *  <th>namespaceConfig</th>
 *  <th>resulting url</th>
 * </tr>
 * <tr>
 *  <td>bigproj.BORK.async#func1</td>
 *  <td>
 *    <table>
 *    <tr>
 *      <td>url</td>
 *      <td>https://big.web/</td>
 *    </tr>
 *    <tr>
 *      <td>structure</td>
 *      <td>"slashed"</td>
 *    </tr>
 *    <tr>
 *      <td>appendhtml</td>
 *      <td>true</td>
 *    </tr>
 *    <tr>
 *      <td>dropFirst</td>
 *      <td>true</td>
 *    </tr>
 *    </table>
 *  </td>
 *  <td>
 *   https://big.web/BORK/async.html#func1
 *  </td>
 * </tr>
 * 
 * </table>
 * 
 * </p>
 * 
 * <b>Uses synonymn 'od'</b>
 * 
 * @module plugins/outerDocs
 * 
 */
 
// v 1.0.0
// karl miller, 11/23/21

/**
 * @typedef externalNamespaceConfig
 * @description Configure an external namespace. Should be a property of {@link outerDocsConfig}. Describes how to turn values given to the outerdocs tag into working urls.
 * @property {string} url - The full base url of the external documentation link. The rest of the url will appended to this link based on tag values and externalNamespaceConfig settings.
 * @property {string} structure - Either "slashes" or "dots". If "slashes", url will be '<baseurl>/path/to' and if 'dots', url will be '<baseurl>.path.to'
 * @property {boolean} appendhtml - Whether to append '.html' to the end of the created url.
 * @property {boolean} dropFirst - Whether to drop the first namespace of the value parameter when constructing the url. If set to true and the value 'path.to.my.object' is passed to outerdocs, the result will be <baseurl>.to.my.object. If false, it will be <baseurl>.path.to.my.object
 */

/**
 * @typedef
 * @name outerDocsConfig
 * @description Holder of external namespace configs. The object should be a member of {@link module:jsdoc/env jsdoc/env } with the key 'outerDocs'. It's created by setting up the configuration object properly when jsdoc is run.
 * @property {externalNamespaceConfig} externalnameSpaceConfig - Each namespaceconfig should have a unique key. The key is how the outerdocs tag will reference it in the outerDocsConfig
 */


 var logger;
 try {
     logger = require('jsdoc/util/logger')
 } catch(e){
     logger = console;
 }
 
 var globalConfig;
 
 /**
  * Finds the first period in a string and returns the part of the string before that period. If no period is found, returns the string.
  * @private
  * @param {string} tagValue - The string passed to the outerdocs tag
  */
  function getLinkName(tagValue) {
     let firstDotIndex = tagValue.indexOf('.');
     if(firstDotIndex >= 0) { return tagValue.substr(0, firstDotIndex); }
     else { return tagValue; }
 }
 
 
 /**
  * @typedef {Object} splitLink
  * @description Object with a prop for the id(#) component of a string and a prop for the leading part of the string
  * @private
  * @property {string} id - the id and # which will be appended to the end of the url
  * @property {string} linkBase - the base of the string before the id portion
  * @property {string} linkText - The name to display for the link, defaults to link base
  */
 
 /**
  * Finds the first ID marker, the # symbol.
  * Returns the ID marker, including the # symbol as one property of the return object and the link base as the other.
  * @private
  * @param {string} tagValue - The string passed to the outerdocs tag
  * @returns {splitLink} 
  */
 function splitRawLink(tagValue) {
     let returnObject = {
         id: '',
         linkBase: '',
         linkText: '',
     }
     let spaceIndex = tagValue.indexOf(' ');
     if(spaceIndex > 0) {
         returnObject.linkText = tagValue.substr(spaceIndex);
         tagValue = tagValue.substr(0, spaceIndex);
     } else {
         returnObject.linkText = tagValue;
     }
     let poundIndex = tagValue.indexOf('#');
     if(poundIndex < 0) {
         returnObject.linkBase = tagValue;
     }
     else {
         returnObject.linkBase = tagValue.substr(0, poundIndex);
         returnObject.id = tagValue.substr(poundIndex);
     }
     return returnObject
 }
 
 /**
  * Tries to load {@link outerDocsConfig} from ${@link jsdoc/env}. jsdoc will still run but outerdocs will do nothing without the config. Tries to load config another way when the tag is added.
  */
 function parseBegin() {
     try{
         let outerdocsConfig = env.conf["outerdocs"];
     } catch(e) {
         logger.warn('plugin/@outerdocs couldnt load configuration on first try.')
     }
 }
 
 /**
  * Builds the URL from the value passed to outerdocs and the config settings, and returns it.
  * 
  * @param {string} val - The value passed to Outerdoc tag, tag.value
  * @param {outerDocsConfig} config - The external namespace configurations
  * @return {string} - The url inside a @ link tag
  */
 function getLinktextFromNamespaceConfig(val, config) {
     let linkName = getLinkName(val);
     if(config[linkName] == undefined) {
         logger.warn(`plugin/@outerdocs:: external namespace -${linkName}- was not defined in the configuration file. Making blank link to jsdoc.app`);
         return 'https://jsdoc.app';
     }
     else {
         let namespaceConfig = config[linkName];
         if(namespaceConfig.url) {
 
             let url = "";
 
             // work with the part before any # symbols
             let workingValue = val;
             let idParse = splitRawLink(workingValue);
             workingValue = idParse.linkBase;
 
             //drop first part of name when building link or not
             if(namespaceConfig.dropFirst) {
                 workingValue = workingValue.replace(linkName + ".","");
                 if(workingValue == linkName) {
                     workingValue = "";
                 }
             }
             else {
                 if(namespaceConfig.dropFirst != false) {
                     logger.warn(`plugin/@outerdocs:: dropFirst was not in namespace config for ${linkName}. Defaults to false.`);
                 }
             }
 
             // replace dots with slashes if set that way, defaults to replacing
             let structure = "";
             if(!namespaceConfig.structure) {
                 logger.warn(`plugin/@outerdocs:: structure was not defined in the ${linkName} namespace. Should be either 'dots' or 'slashes'. Defaulting to dots.`);
                 structure = 'slashes';
             }
             if(namespaceConfig.structure != 'dots' && namespaceConfig.structure != 'slashes') {
                 logger.warn(`plugin/@outerdocs:: structure was invalid in the ${linkName} namespace. Should be either 'dots' or 'slashes'. Defaulting to slashes`);
                 structure = 'slashes';
             }
 
             if(structure == "slashes" || namespaceConfig.structure == "slashes") {
                 workingValue = workingValue.replaceAll('.','/');
             }
 
             url += workingValue;
 
             //append .html at the end or not
 
             if(namespaceConfig.appendhtml) {
                 url += '.html';
             }
             else if(namespaceConfig.appendhtml == undefined) {
                 logger.warn(`appendhtml was not defined in the ${linkName} configuration. Should be true or false. Defaulting to false.`)
             }
 
             return `${namespaceConfig.url}${url}${idParse.id} ${idParse.linkText}`
 
 
         }
         else {
             logger.warn(`@outerdocs:: url was not defined in ${env.opts.configure}: ${linkName}.url. No external link will be created`);
         }
     }
 }
 
 /**
  * Executed when an outerdocs tag is found. 
  * 
  * @param {module:jsdoc/doclet/doclet~doclet} doclet - The doclet
  * @param {module:jsdoc/tag~tag} tag 
  */
 function onTagged(doclet, tag) {
     if(!globalConfig) {
         try{
             globalConfig = env.conf;
         } catch(e) {
            logger.error("plugin/@outerdocs:: can't find the jsdoc config object!")
         }
     }
     if(!globalConfig["outerdocs"]) {
        logger.error(`plugin/@outerdocs:: Can't find the outerdocs config object. Ensure configuration file is correct.`)
     }
     else {
         // console.log(`adding outerdoc to ${doclet.name} in ${doclet.meta.filename} at line ${doclet.meta.lineno} for ${tag.text}`);
         let outerdocsConfig = globalConfig["outerdocs"];
         let linktext = getLinktextFromNamespaceConfig(tag.value, outerdocsConfig);
 
         if(!doclet.see) {
             doclet.see = []
         }
         if(!doclet.description) {
             doclet.description = ''; // can't add see without a description it seems
         }
         doclet.see.push(`{@link ${linktext}}`);
     }
 }
 
 /**
  * Defines the outerdocs tag. 
  * @param {module:jsdoc/tag/dictionary/dictionary} dictionary - the dictionary to add the tag to.
  */
 function defineOuterdocsTag(dictionary, deps) {
     //console.log(deps);
     if(!globalConfig) {
         try{
             globalConfig = deps.get('config');
             //console.log('deps.get worked')
         } catch(e) {
             try{
                 globalConfig = deps.env.conf;
                 //console.log('deps.env.conf worked')
             } catch(e) {

             }
         }
     }
     dictionary.defineTag('outerdocs', {
         mustHaveValue: true,
         onTagged: onTagged
     }).synonym('od');
 
 }
 
 /**
  * @property {Object} handlers - exported event handlers
  * @property {function} handlers.parseBegin - fired when parsing starts
  * @property {function} defineTags - defines outer docs tag
  */
 module.exports = {
     handlers: {
         parseBegin: parseBegin
     },
     defineTags: defineOuterdocsTag
 }