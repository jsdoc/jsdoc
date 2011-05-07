markdown-js
===========

Yet another markdown parser, this time for JavaScript. There's a few
options that precede this project but they all treat markdown to HTML
conversion as a single step process. You pass markdown in and get HTML
out, end of story. We had some pretty particular views on how the
process should actually look, which include:

  * producing well-formed HTML. This means that em and strong nesting is
    important, as is the ability to output as both HTML and XHTML

  * having an intermediate representation to allow processing of parsed
    data (we in fact have two, both [JsonML]: a markdown tree and an
    HTML tree)

  * being easily extensible to add new dialects without having to
    rewrite the entire parsing mechanics

  * having a good test suite. The only test suites we could find tested
    massive blocks of input, and passing depended on outputting the HTML
    with exactly the same whitespace as the original implementation

[JsonML]: http://jsonml.org/ "JSON Markup Language"

## Usage

The simple way to use it with CommonJS is:

    var input = "# Heading\n\nParagraph";
    var output = require( "markdown" ).toHTML( input );
    print( output );

If you want more control check out the documentation in
[lib/markdown.js] which details all the methods and parameters
available (including examples!). One day we'll get the docs generated
and hosted somewhere for nicer browsing.

We're yet to try it out in a browser, though it's high up on our list of
things to sort out for this project.

[lib/markdown.js]: http://github.com/evilstreak/markdown-js/blob/master/lib/markdown.js

## Intermediate Representation

Internally the process to convert a chunk of markdown into a chunk of
HTML has three steps:

 1. Parse the markdown into a JsonML tree. Any references found in the
    parsing are stored in the attribute hash of the root node under the
    key `references`.

 2. Convert the markdown tree into an HTML tree. Rename any nodes that
    need it (`bulletlist` to `ul` for example) and lookup any references
    used by links or images. Remove the references attribute once done.

 3. Stringify the HTML tree being careful not to wreck whitespace where
    whitespace is important (surrounding inline elements for example).

Each step of this process can be called individually if you need to do
some processing or modification of the data at an intermediate stage.
For example, you may want to grab a list of all URLs linked to in the
document before rendering it to HTML which you could do by recursing
through the HTML tree looking for `a` nodes.

## License

Released under the MIT license.
