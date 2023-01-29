/**
 * Translate doclet descriptions from Markdown into HTML.
 */
const { getRenderer } = require('../lib/markdown');

const tags = [
  'author',
  'classdesc',
  'description',
  'exceptions',
  'params',
  'properties',
  'returns',
  'see',
  'summary',
];
const render = getRenderer();

function shouldProcessString(tagName, text) {
  let shouldProcess = true;

  // we only want to process `@author` and `@see` tags that contain Markdown links
  if ((tagName === 'author' || tagName === 'see') && !text.includes('[')) {
    shouldProcess = false;
  }

  return shouldProcess;
}

/**
 * Process the Markdown source in a doclet. Handled properties can be bare strings, objects, or
 * arrays of objects.
 */
function process(doclet) {
  tags.forEach((tag) => {
    if (!Object.hasOwn(doclet, tag)) {
      return;
    }

    if (typeof doclet[tag] === 'string' && shouldProcessString(tag, doclet[tag])) {
      doclet[tag] = render(doclet[tag]);
    } else if (Array.isArray(doclet[tag])) {
      doclet[tag].forEach((value, index, original) => {
        const inner = {};

        inner[tag] = value;
        process(inner);
        original[index] = inner[tag];
      });
    } else if (doclet[tag]) {
      process(doclet[tag]);
    }
  });
}

exports.handlers = {
  /**
   * Translate Markdown syntax within a doclet into HTML.
   */
  newDoclet({ doclet }) {
    process(doclet);
  },
};
