var Markdown = require('Markdown').Markdown,
    mk_block = Markdown.mk_block;

var tests = {
  meta: function(fn) {
    return function() { fn( new Markdown ) }
  }
};

tests = {
  test_split_block: tests.meta(function(md) {
    asserts.same(
        md.split_blocks( "# h1 #\n\npara1\npara1L2\n  \n\n\n\npara2\n" ),
        [mk_block( "# h1 #", "\n\n", 1 ),
         mk_block( "para1\npara1L2", "\n  \n\n\n\n", 3 ),
         mk_block( "para2", "\n", 9 )
        ],
        "split_block should record trailing newlines");

    asserts.same(
        md.split_blocks( "\n\n# heading #\n\npara\n" ),
        [mk_block( "# heading #", "\n\n", 3 ),
         mk_block( "para", "\n", 5 )
        ],
        "split_block should ignore leading newlines");
  }),

  test_headers: tests.meta(function(md) {
    var h1 = md.dialect.block.atxHeader( "# h1 #\n\n", [] ),
        h2;

    asserts.same(
      h1,
      md.dialect.block.setextHeader( "h1\n===\n\n", [] ),
      "Atx and Setext style H1s should produce the same output" );

    asserts.same(
      md.dialect.block.atxHeader("# h1\n\n"),
      h1,
      "Closing # optional on atxHeader");

    asserts.same(
      h2 = md.dialect.block.atxHeader( "## h2\n\n", [] ),
      [["header", {level: 2}, "h2"]],
      "Atx h2 has right level");

    asserts.same(
      h2,
      md.dialect.block.setextHeader( "h2\n---\n\n", [] ),
      "Atx and Setext style H2s should produce the same output" );

  }),

  test_code: tests.meta(function(md) {
    var code = md.dialect.block.code,
        next = [ mk_block("next") ];

    asserts.same(
      code.call( md, mk_block("    foo\n    bar"), next ),
      [["code_block", "foo\nbar" ]],
      "Code block correct");

    asserts.same(
      next, [mk_block("next")],
      "next untouched when its not code");

    next = [];
    asserts.same(
      code.call( md, mk_block("    foo\n  bar"), next ),
      [["code_block", "foo" ]],
      "Code block correct for abutting para");

    asserts.same(
      next, [mk_block("  bar")],
      "paragraph put back into next block");

    asserts.same(
      code.call( md, mk_block("    foo"), [mk_block("    bar"), ] ),
      [["code_block", "foo\n\nbar" ]],
      "adjacent code blocks ");

    asserts.same(
      code.call( md, mk_block("    foo","\n  \n      \n"), [mk_block("    bar"), ] ),
      [["code_block", "foo\n\n\nbar" ]],
      "adjacent code blocks preserve correct number of empty lines");

  }),

  test_bulletlist: tests.meta(function(md) {
    var bl = function() { return md.dialect.block.lists.apply(md, arguments) };

    asserts.same(
      bl( mk_block("* foo\n* bar"), [] ),
      [ [ "bulletlist", [ "listitem", "foo" ], [ "listitem", "bar" ] ] ],
      "single line bullets");

    asserts.same(
      bl( mk_block("* [text](url)" ), [] ),
      [ [ "bulletlist", [ "listitem", [ "link", { href: "url" }, "text" ] ] ] ],
      "link in bullet");

    asserts.same(
      bl( mk_block("* foo\nbaz\n* bar\nbaz"), [] ),
      [ [ "bulletlist", [ "listitem", "foo\nbaz" ], [ "listitem", "bar\nbaz" ] ] ],
      "multiline lazy bullets");

    asserts.same(
      bl( mk_block("* foo\n  baz\n* bar\n  baz"), [] ),
      [ [ "bulletlist", [ "listitem", "foo\nbaz" ], [ "listitem", "bar\nbaz" ] ] ],
      "multiline tidy bullets");

    asserts.same(
      bl( mk_block("* foo\n     baz"), [] ),
      [ [ "bulletlist", [ "listitem", "foo\n baz" ] ] ],
      "only trim 4 spaces from the start of the line");

    /* Test wrong: should end up with 3 nested lists here
    asserts.same(
      bl( mk_block(" * one\n  * two\n   * three" ), [] ),
      [ [ "bulletlist", [ "listitem", "one" ], [ "listitem", "two" ], [ "listitem", "three" ] ] ],
      "bullets can be indented up to three spaces");
    */

    asserts.same(
      bl( mk_block("  * one"), [ mk_block("    two") ] ),
      [ [ "bulletlist", [ "listitem", [ "para", "one" ], [ "para", "two" ] ] ] ],
      "loose bullet lists can have multiple paragraphs");

    /* Case: no space after bullet - not a list
     | *↵
     |foo
     */
    asserts.same(
      bl( mk_block(" *\nfoo") ),
      undefined,
      "Space required after bullet to trigger list");

    /* Case: note the space after the bullet
     | *␣
     |foo
     |bar
     */
    asserts.same(
      bl( mk_block(" * \nfoo\nbar"), [ ] ),
      [ [ "bulletlist", [ "listitem", "foo\nbar" ] ] ],
      "space+continuation lines");


    /* Case I:
     | * foo
     |     * bar
     |   * baz
     */
    asserts.same(
      bl( mk_block(" * foo\n" +
                   "      * bar\n" +
                   "    * baz"),
          [] ),
      [ [ "bulletlist",
          [ "listitem",
            "foo",
            [ "bulletlist",
              [ "listitem",
                "bar",
                [ "bulletlist",
                  [ "listitem", "baz" ]
                ]
              ]
            ]
          ]
      ] ],
      "Interesting indented lists I");

    /* Case II:
     | * foo
     |      * bar
     | * baz
     */
    asserts.same(
      bl( mk_block(" * foo\n      * bar\n * baz"), [] ),
      [ [ "bulletlist",
          [ "listitem",
            "foo",
            [ "bulletlist",
              [ "listitem", "bar" ]
            ]
          ],
          [ "listitem", "baz" ]
      ] ],
      "Interesting indented lists II");

    /* Case III:
     |  * foo
     |   * bar
     |* baz
     | * fnord
     */
    asserts.same(
      bl( mk_block("  * foo\n   * bar\n* baz\n * fnord"), [] ),
      [ [ "bulletlist",
          [ "listitem",
            "foo",
            [ "bulletlist",
              [ "listitem", "bar" ],
              [ "listitem", "baz" ],
              [ "listitem", "fnord" ]
            ]
          ]
      ] ],
      "Interesting indented lists III");

    /* Case IV:
     | * foo
     |
     | 1. bar
     */
    asserts.same(
      bl( mk_block(" * foo"), [ mk_block(" 1. bar\n") ] ),
      [ [ "bulletlist",
          ["listitem", ["para", "foo"] ],
          ["listitem", ["para", "bar"] ]
      ] ],
      "Different lists at same indent IV");

    /* Case V:
     |   * foo
     |  * bar
     | * baz
     */
    asserts.same(
      bl( mk_block("   * foo\n  * bar\n * baz"), [] ),
      [ [ "bulletlist",
          [ "listitem",
            "foo",
            [ "bulletlist",
              ["listitem", "bar"],
              ["listitem", "baz"],
            ]
          ]
      ] ],
      "Indenting Case V")

    /* Case VI: deep nesting
     |* one
     |    * two
     |        * three
     |            * four
     */
    asserts.same(
      bl( mk_block("* one\n    * two\n        * three\n            * four"), [] ),
      [ [ "bulletlist",
          [ "listitem",
            "one",
            [ "bulletlist",
              [ "listitem",
                "two",
                [ "bulletlist",
                  [ "listitem",
                    "three",
                    [ "bulletlist",
                      [ "listitem", "four" ]
                    ]
                  ]
                ]
              ]
            ]
          ]
      ] ],
      "deep nested lists VI")

    /* Case VII: This one is just fruity!
     |   * foo
     |  * bar
     | * baz
     |* HATE
     |  * flibble
     |   * quxx
     |    * nest?
     |        * where
     |      * am
     |     * i?
     */
    asserts.same(
      bl( mk_block("   * foo\n" +
                   "  * bar\n" +
                   " * baz\n" +
                   "* HATE\n" +
                   "  * flibble\n" +
                   "   * quxx\n" +
                   "    * nest?\n" +
                   "        * where\n" +
                   "      * am\n" +
                   "     * i?"),
        [] ),
      [ [ "bulletlist",
          [ "listitem",
            "foo",
            [ "bulletlist",
              ["listitem", "bar"],
              ["listitem", "baz"],
              ["listitem", "HATE"],
              ["listitem", "flibble"]
            ]
          ],
          [ "listitem",
            "quxx",
            [ "bulletlist",
              [ "listitem",
                "nest?",
                [ "bulletlist",
                  ["listitem", "where"],
                  ["listitem", "am"],
                  ["listitem", "i?"]
                ]
              ]
            ]
          ]
      ] ],
      "Indenting Case VII");

    /* Case VIII: Deep nesting + code block
     |   * one
     |    * two
     |        * three
     |                * four
     |
     |                foo
     */
    asserts.same(
      bl( mk_block("   * one\n" +
                   "    1. two\n" +
                   "        * three\n" +
                   "                * four",
                   "\n\n"),
          [ mk_block("                foo") ] ),
      [ [ "bulletlist",
          [ "listitem",
            ["para", "one"],
            [ "numberlist",
              [ "listitem",
                ["para", "two"],
                [ "bulletlist",
                  [ "listitem",
                    [ "para", "three\n    * four"],
                    ["code_block", "foo"]
                  ]
                ]
              ]
            ]
          ]
      ] ],
      "Case VIII: Deep nesting and code block");

  }),

  test_horizRule: tests.meta(function(md) {
    var hr = md.dialect.block.horizRule,
        strs = ["---", "_ __", "** ** **", "--- "];
    strs.forEach( function(s) {
      asserts.same(
        hr.call( md, mk_block(s), [] ),
        [ [ "hr" ] ],
        "simple hr from " + uneval(s));
    });
  }),

  test_blockquote: tests.meta(function(md) {
    var bq = md.dialect.block.blockquote;
    asserts.same(
      bq.call( md, mk_block("> foo\n> bar"), [] ),
      [ ["blockquote", ["para", "foo\nbar"] ] ],
      "simple blockquote");

    // Note: this tests horizRule as well through block processing.
    asserts.same(
      bq.call( md, mk_block("> foo\n> bar\n>\n>- - - "), [] ),
      [ ["blockquote",
          ["para", "foo\nbar"],
          ["hr"]
      ] ],
      "blockquote with interesting content");

  }),

  test_referenceDefn: tests.meta(function(md) {
    var rd = md.dialect.block.referenceDefn;

    [ '[id]: http://example.com/  "Optional Title Here"',
      "[id]: http://example.com/  'Optional Title Here'",
      '[id]: http://example.com/  (Optional Title Here)'
    ].forEach( function(s) {
      md.tree = ["markdown"];

      asserts.same(rd.call( md, mk_block(s) ), [], "ref processed");

      asserts.same(md.tree[ 1 ].references,
                   { "id": { href: "http://example.com/", title: "Optional Title Here" } },
                   "reference extracted");
    });

    // Check a para abbuting a ref works right
    md.tree = ["markdown"];
    var next = [];
    asserts.same(rd.call( md, mk_block("[id]: example.com\npara"), next ), [], "ref processed");
    asserts.same(md.tree[ 1 ].references, { "id": { href: "example.com" } }, "reference extracted");
    asserts.same(next, [ mk_block("para") ], "paragraph put back into blocks");

  }),

  test_inline_br: tests.meta(function(md) {
    asserts.same(
      md.processInline("foo  \n\\[bar"),
      [ "foo", ["linebreak"], "[bar" ], "linebreak+escape");
  }),

  test_inline_escape: tests.meta(function(md) {
    asserts.same( md.processInline("\\bar"), [ "\\bar" ], "invalid escape" );
    asserts.same( md.processInline("\\*foo*"), [ "*foo*" ], "escaped em" );
  }),

  test_inline_code: tests.meta(function(md) {
    asserts.same( md.processInline("`bar`"), [ ["inlinecode", "bar" ] ], "code I" );
    asserts.same( md.processInline("``b`ar``"), [ ["inlinecode", "b`ar" ] ], "code II" );
    asserts.same( md.processInline("```bar``` baz"), [ ["inlinecode", "bar" ], " baz" ], "code III" );
  }),

  test_inline_strong_em: tests.meta(function(md) {
    // Yay for horrible edge cases >_<
    asserts.same( md.processInline("foo *abc* bar"), [ "foo ", ["em", "abc" ], " bar" ], "strong/em I" );
    asserts.same( md.processInline("*abc `code`"), [ "*abc ", ["inlinecode", "code" ] ], "strong/em II" );
    asserts.same( md.processInline("*abc**def* after"), [ ["em", "abc**def" ], " after" ], "strong/em III" );
    asserts.same( md.processInline("*em **strong * wtf**"), [ ["em", "em **strong " ], " wtf**" ], "strong/em IV" );
    asserts.same( md.processInline("*foo _b*a*r baz"), [ [ "em", "foo _b" ], "a*r baz" ], "strong/em V" );
  }),

  test_inline_img: tests.meta(function(md) {

    asserts.same( md.processInline( "![alt] (url)" ),
                                    [ [ "img", { href: "url", alt: "alt" } ] ],
                                    "inline img I" );

    asserts.same( md.processInline( "![alt](url 'title')" ),
                                    [ [ "img", { href: "url", alt: "alt", title: "title" } ] ],
                                    "inline img II" );

    asserts.same( md.processInline( "![alt] (url 'tit'le') after')" ),
                                    [ [ "img", { href: "url", alt: "alt", title: "tit'le" } ], " after')" ],
                                    "inline img III" );

    asserts.same( md.processInline( "![alt] (url \"title\")" ),
                                    [ [ "img", { href: "url", alt: "alt", title: "title" } ] ],
                                    "inline img IV" );

    asserts.same( md.processInline( "![alt][id]" ),
                                    [ [ "img_ref", { ref: "id", alt: "alt", text: "![alt][id]" } ] ],
                                    "ref img I" );

    asserts.same( md.processInline( "![alt] [id]" ),
                                    [ [ "img_ref", { ref: "id", alt: "alt", text: "![alt] [id]" } ] ],
                                    "ref img II" );
  }),

  test_inline_link: tests.meta(function(md) {

    asserts.same( md.processInline( "[text] (url)" ),
                                    [ [ "link", { href: "url" }, "text" ] ],
                                    "inline link I" );

    asserts.same( md.processInline( "[text](url 'title')" ),
                                    [ [ "link", { href: "url", title: "title" }, "text" ] ],
                                    "inline link II" );

    asserts.same( md.processInline( "[text](url 'tit'le') after')" ),
                                    [ [ "link", { href: "url", title: "tit'le" }, "text" ], " after')" ],
                                    "inline link III" );

    asserts.same( md.processInline( "[text](url \"title\")" ),
                                    [ [ "link", { href: "url", title: "title" }, "text" ] ],
                                    "inline link IV" );

    asserts.same( md.processInline( "[text][id]" ),
                                    [ [ "link_ref", { ref: "id", original: "[text][id]" }, "text" ] ],
                                    "ref link I" );

    asserts.same( md.processInline( "[text] [id]" ),
                                    [ [ "link_ref", { ref: "id", original: "[text] [id]" }, "text" ] ],
                                    "ref link II" );
  }),

  test_inline_autolink: tests.meta(function(md) {

    asserts.same( md.processInline( "<http://foo.com>" ),
                                    [ [ "link", { href: "http://foo.com" }, "http://foo.com" ] ],
                                    "autolink I" );

    asserts.same( md.processInline( "<mailto:foo@bar.com>" ),
                                    [ [ "link", { href: "mailto:foo@bar.com" }, "foo@bar.com" ] ],
                                    "autolink II" );

    asserts.same( md.processInline( "<foo@bar.com>" ),
                                    [ [ "link", { href: "mailto:foo@bar.com" }, "foo@bar.com" ] ],
                                    "autolink III" );
  }),
}


if (require.main === module) {
  var asserts = require('test').asserts;
  require('test').runner(tests);
}
