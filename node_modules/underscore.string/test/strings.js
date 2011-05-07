$(document).ready(function() {

  module("String extensions");

  test("Strings: basic", function() {
    equals(_.trim("   epeli  "), "epeli", "Basic");
    equals(_.strip("   epeli  "), "epeli", "Aliases");
    equals(_("   epeli  ").trim(), "epeli", "Object-Oriented style");
    equals(_("   epeli  ").chain().trim().capitalize().value(), "Epeli", "Can chain");
  });

  test("Strings: capitalize", function() {
    equals(_("fabio").capitalize(), "Fabio", 'First letter is upper case');
    equals(_.capitalize("fabio"), "Fabio", 'First letter is upper case');
  });

  test("Strings: join", function() {
    equals(_.join("", "foo", "bar"), "foobar", 'basic join');
    equals(_.join("", 1, "foo", 2), "1foo2", 'join numbers and strings');
    equals(_.join(" ","foo", "bar"), "foo bar", 'join with spaces');
    equals(_.join("1", "2", "2"), "212", 'join number strings');
    equals(_.join(1, 2, 2), "212", 'join numbers');
    equals(_(" ").join("foo", "bar"), "foo bar", 'join object oriented');
  });

//  test("Strings: reverse", function() {
//    equals(_.reverse("foo"), "oof" );
//    equals(_.reverse("foobar"), "raboof" );
//    equals(_.reverse("foo bar"), "rab oof" );
//    equals(_.reverse("saippuakauppias"), "saippuakauppias" );
//  });

  test("Strings: trim", function() {
    equals(_(" foo").trim(), "foo");
    equals(_("foo ").trim(), "foo");
    equals(_(" foo ").trim(), "foo");
    equals(_("    foo     ").trim(), "foo");
    equals(_("    foo     ", " ").trim(), "foo", "Manually set whitespace");

    equals(_("ffoo").trim("f"), "oo");
    equals(_("ooff").trim("f"), "oo");
    equals(_("ffooff").trim("f"), "oo");


    equals(_("_-foobar-_").trim("_-"), "foobar");

    equals(_("http://foo/").trim("/"), "http://foo");
    equals(_("c:\\").trim('\\'), "c:");
  });

  test("Strings: ltrim", function() {
    equals(_(" foo").ltrim(), "foo");
    equals(_("    foo").ltrim(), "foo");
    equals(_("foo ").ltrim(), "foo ");
    equals(_(" foo ").ltrim(), "foo ");


    equals(_("ffoo").ltrim("f"), "oo");
    equals(_("ooff").ltrim("f"), "ooff");
    equals(_("ffooff").ltrim("f"), "ooff");

    equals(_("_-foobar-_").ltrim("_-"), "foobar-_");
  });

  test("Strings: rtrim", function() {
    equals(_("http://foo/").rtrim("/"), "http://foo", 'clean trailing slash');
    equals(_(" foo").rtrim(), " foo");
    equals(_("foo ").rtrim(), "foo");
    equals(_("foo     ").rtrim(), "foo");
    equals(_("foo  bar     ").rtrim(), "foo  bar");
    equals(_(" foo ").rtrim(), " foo");

    equals(_("ffoo").rtrim("f"), "ffoo");
    equals(_("ooff").rtrim("f"), "oo");
    equals(_("ffooff").rtrim("f"), "ffoo");

    equals(_("_-foobar-_").rtrim("_-"), "_-foobar");
  });

  test("Strings: clean", function() {
    equals(_(" foo    bar   ").clean(), "foo bar");
  });

  test("Strings: sprintf", function() {
    // Should be very tested function already.  Thanks to
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    equals(_.sprintf("Hello %s", "me"), "Hello me", 'basic');
    equals(_("Hello %s").sprintf("me"), "Hello me", 'object');
    equals(_("hello %s").chain().sprintf("me").capitalize().value(), "Hello me", 'Chaining works');
    equals(_.sprintf("%.1f", 1.22222), "1.2", 'round');
    equals(_.sprintf("%.1f", 1.17), "1.2", 'round 2');
  });

  test("Strings: startsWith", function() {
    ok(_("foobar").startsWith("foo"), 'foobar starts with foo');
    ok(!_("oobar").startsWith("foo"), 'oobar does not start with foo');
  });

  test("Strings: endsWith", function() {
    ok(_("foobar").endsWith("bar"), 'foobar ends with bar');
    ok(_.endsWith("foobar", "bar"), 'foobar ends with bar');
    ok(_.endsWith("00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4", "mp4"), 'endsWith .mp4');
    ok(!_("fooba").endsWith("bar"), 'fooba does not end with bar');
  });

  test("Strings: includes", function() {
    ok(_("foobar").includes("bar"), 'foobar includes bar');
    ok(!_("foobar").includes("buzz"), 'foobar does not includes buzz');
  });

  test('String: chop', function(){
    ok(_('whitespace').chop(2).length === 5, "output ['wh','it','es','pa','ce']");
    ok(_('whitespace').chop(3).length === 4, "output ['whi','tes','pac','e']");
    ok(_('whitespace').chop()[0].length === 10, "output ['whitespace']");
  });

  test('String: count', function(){
    equals(_('Hello world').count('l'), 3);
    equals(_('Hello world').count('Hello'), 1);
    equals(_('Hello world').count('foo'), 0);
  });

  test('String: insert', function(){
    equals(_('Hello ').insert(6, 'Jessy'), 'Hello Jessy');
  });

  test('String: splice', function(){
    equals(_('https://edtsech@bitbucket.org/edtsech/underscore.strings').splice(30, 7, 'epeli'),
           'https://edtsech@bitbucket.org/epeli/underscore.strings');
  });

  test('String: succ', function(){
    equals(_('a').succ(), 'b');
    equals(_('A').succ(), 'B');
    equals(_('+').succ(), ',');
  });

  test('String: titleize', function(){
    equals(_('the titleize string method').titleize(), 'The Titleize String Method');
    equals(_('the titleize string  method').titleize(), 'The Titleize String  Method');
  });

  test('String: camelize', function(){
    equals(_('the_camelize_string_method').camelize(), 'theCamelizeStringMethod');
    equals(_('-the-camelize-string-method').camelize(), 'TheCamelizeStringMethod');
    equals(_('the camelize string method').camelize(), 'theCamelizeStringMethod');
    equals(_(' the camelize  string method').camelize(), 'theCamelizeStringMethod');
    equals(_('the camelize   string method').camelize(), 'theCamelizeStringMethod');
  });

  test('String: underscored', function(){
    equals(_('the-underscored-string-method').underscored(), 'the_underscored_string_method');
    equals(_('theUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equals(_('TheUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equals(_(' the underscored  string method').underscored(), 'the_underscored_string_method');
  });

  test('String: dasherize', function(){
    equals(_('the_dasherize_string_method').dasherize(), 'the-dasherize-string-method');
    equals(_('TheDasherizeStringMethod').dasherize(), '-the-dasherize-string-method');
    equals(_('the dasherize string method').dasherize(), 'the-dasherize-string-method');
    equals(_('the  dasherize string method  ').dasherize(), 'the-dasherize-string-method');
  });

  test('String: truncate', function(){
    equals(_('Hello world').truncate(6, 'read more'), 'Hello read more');
    equals(_('Hello world').truncate(5), 'Hello...');
  });

  test('String: isBlank', function(){
    ok(_('').isBlank());
    ok(_(' ').isBlank());
    ok(_('\n').isBlank());
    ok(!_('a').isBlank());
  });

  test('String: escapeHTML', function(){
    equals(_('<div>Blah blah blah</div>').escapeHTML(), '&lt;div&gt;Blah blah blah&lt;/div&gt;');
    equals(_(5).escapeHTML(), '5');
    equals(_(undefined).escapeHTML(), '');
  });

  test('String: unescapeHTML', function(){
    equals(_('&lt;div&gt;Blah blah blah&lt;/div&gt;').unescapeHTML(), '<div>Blah blah blah</div>');
    equals(_(5).unescapeHTML(), '5');
    equals(_(undefined).unescapeHTML(), '');
  });

  test('String: words', function() {
    equals(_("I love you!").words().length, 3);
    equals(_("I_love_you!").words('_').length, 3);
    equals(_("I-love-you!").words(/-/).length, 3);
  });

  test('String: chars', function() {
    equals(_("Hello").chars().length, 5);
  });

  test('String: lines', function() {
    equals(_("Hello\nWorld").lines().length, 2);
    equals(_("Hello World").lines().length, 1);
  });

  test('String: pad', function() {
    equals(_("1").pad(8), '       1');
    equals(_("1").pad(8, '0'), '00000001');
    equals(_("1").pad(8, '0', 'left'), '00000001');
    equals(_("1").pad(8, '0', 'right'), '10000000');
    equals(_("1").pad(8, '0', 'both'), '00001000');
    equals(_("foo").pad(8, '0', 'both'), '000foo00');
    equals(_("foo").pad(7, '0', 'both'), '00foo00');
    equals(_("foo").pad(7, '!@$%dofjrofj', 'both'), '!!foo!!');
  });

  test('String: lpad', function() {
    equals(_("1").lpad(8), '       1');
    equals(_("1").lpad(8, '0'), '00000001');
    equals(_("1").lpad(8, '0', 'left'), '00000001');
  });

  test('String: rpad', function() {
    equals(_("1").rpad(8), '1       ');
    equals(_("1").rpad(8, '0'), '10000000');
    equals(_("foo").rpad(8, '0'), 'foo00000');
    equals(_("foo").rpad(7, '0'), 'foo0000');
  });

  test('String: lrpad', function() {
    equals(_("1").lrpad(8), '    1   ');
    equals(_("1").lrpad(8, '0'), '00001000');
    equals(_("foo").lrpad(8, '0'), '000foo00');
    equals(_("foo").lrpad(7, '0'), '00foo00');
    equals(_("foo").lrpad(7, '!@$%dofjrofj'), '!!foo!!');
  });

});
