# Underscore.string #

Idea: Esa-Matti Suuronen (esa-matti aet suuronen dot org)

Authors: Esa-Matti Suuronen, Edward Tsech

Javascript lacks complete string manipulation operations.
This an attempt to fill that cap. List of buildin methods can be found
for example from [Dive Into JavaScript][d].

[d]: http://www.diveintojavascript.com/core-javascript-reference/the-string-object


As name states this an extension for [Underscore.js][u], but it can be used
independently from **_s**-global variable. But with Underscore.js you can
use Object-Oriented style and chaining:

[u]: http://documentcloud.github.com/underscore/

    _("   epeli  ").chain().trim().capitalize().value()
    => "Epeli"

## Node.js installation ##

**npm package**

    npm install underscore.string

**Standalone usage**:

    var _s = require('undescore.string');

**Integrate with Underscore.js**:

    var _  = require('underscore');
    _.mixin(require('underscore.string'));

## String Functions ##

**capitalize** _.capitalize(string)

Converts first letter of the string to uppercase.

    _.capitalize("epeli")
    => "Epeli"

**chop** _.chop(string, step)

    _.chop('whitespace', 3)
    => ['whi','tes','pac','e']

**clean** _.clean(str)

Compress some whitespaces to one.

    _.clean(" foo    bar   ")
    => 'foo bar'

**chars** _.chars(str)

    _.chars('Hello')
    => ['H','e','l','l','o']

**includes** _.includes(string, substring)

Tests if string contains a substring.

    _.includes("foobar", "ob")
    => true

**count** _.count(string, substring)

    _('Hello world').count('l')
    => 3

**escapeHTML** _.escapeHTML(string)

Converts HTML special characters to their entity equivalents.

    _('<div>Blah blah blah</div>').escapeHTML();
    => '&lt;div&gt;Blah blah blah&lt;/div&gt;'

**unescapeHTML** _.unescapeHTML(string)

Converts entity characters to HTML equivalents.

    _('&lt;div&gt;Blah blah blah&lt;/div&gt;').unescapeHTML();
    => '<div>Blah blah blah</div>'

**insert** _.insert(string, index, substing)

    _('Hello ').insert(6, 'world')
    => 'Hello world'

**join** _.join(separator, *strings)

Joins strings together with given separator

    _.join(" ", "foo", "bar")
    => "foo bar"

**lines** _.lines(str)

    _.lines("Hello\nWorld")
    => ["Hello", "World"]

**reverse**

This functions has been removed, because this function override underscore.js 'reverse'.
But now you can do that:

    _("foobar").chars().reverse().join('')

**splice**  _.splice(string, index, howmany, substring)

Like a array splice.

    _('https://edtsech@bitbucket.org/edtsech/underscore.strings').splice(30, 7, 'epeli')
    => 'https://edtsech@bitbucket.org/epeli/underscore.strings'

**startsWith** _.startsWith(string, starts)

This method checks whether string starts with starts.

    _("image.gif").startsWith("image")
    => true

**endsWith** _.endsWith(string, ends)

This method checks whether string ends with ends.

    _("image.gif").endsWith("gif")
    => true

**succ**  _.succ(str)

Returns the successor to str.

    _('a').succ()
    => 'b'

    _('A').succ()
    => 'B'

**supplant**

Supplant function was removed, use Underscore.js [template function][p].

[p]: http://documentcloud.github.com/underscore/#template

**strip** alias for *trim*

**lstrip** alias for *ltrim*

**rstrip** alias for *rtrim*

**titleize** _.titleize(string)

    _('my name is epeli').titleize()
    => 'My Name Is Epeli'

**camelize** _.camelize(string)

Converts underscored or dasherized string to a camelized one

    _('-moz-transform').camelize()
    => 'MozTransform'

**underscored** _.underscored(string)

Converts a camelized or dasherized string into an underscored one

    _(MozTransform).underscored()
    => 'moz_transform'

**dasherize** _.dasherize(string)

Converts a underscored or camelized string into an dasherized one

    _('MozTransform').dasherize()
    => '-moz-transform'

**trim** _.trim(string, [characters])

trims defined characters from begining and ending of the string.
Defaults to whitespace characters.

    _.trim("  foobar   ")
    => "foobar"

    _.trim("_-foobar-_", "_-")
    => "foobar"


**ltrim** _.ltrim(string, [characters])

Left trim. Similar to trim, but only for left side.


**rtrim** _.rtrim(string, [characters])

Left trim. Similar to trim, but only for right side.

**truncate** _.truncate(string, length, truncateString)

    _('Hello world').truncate(5)
    => 'Hello...'

**words** _.words(str, delimiter=" ")

Split string by delimiter (String or RegExp), ' ' by default.

    _.words("I love you")
    => ["I","love","you"]

    _.words("I_love_you", "_")
    => ["I","love","you"]

    _.words("I-love-you", /-/)
    => ["I","love","you"]

**sprintf** _.sprintf(string format, *arguments)

C like string formatting.
Credits goes to [Alexandru Marasteanu][o].
For more detailed documentation, see the [original page][o].

[o]: http://www.diveintojavascript.com/projects/sprintf-for-javascript

    _.sprintf("%.1f", 1.17)
    "1.2"

**pad** _.pad(str, length, [padStr, type])

pads the `str` with characters until the total string length is equal to the passed `length` parameter. By default, pads on the **left** with the space char (`" "`). `padStr` is truncated to a single character if necessary.

    _.pad("1", 8)
    -> "       1";

    _.pad("1", 8, '0')
    -> "00000001";

    _.pad("1", 8, '0', 'right')
    -> "10000000";

    _.pad("1", 8, '0', 'both')
    -> "00001000";

    _.pad("1", 8, 'bleepblorp', 'both')
    -> "bbbb1bbb";

**lpad** _.lpad(str, length, [padStr])

left-pad a string. Alias for `pad(str, length, padStr, 'left')`

    _.lpad("1", 8, '0')
    -> "00000001";

**rpad** _.rpad(str, length, [padStr])

right-pad a string. Alias for `pad(str, length, padStr, 'right')`

    _.rpad("1", 8, '0')
    -> "10000000";

**lrpad** _.lrpad(str, length, [padStr])

left/right-pad a string. Alias for `pad(str, length, padStr, 'both')`

    _.lrpad("1", 8, '0')
    -> "00001000";

**center** alias for **lrpad**

**ljust** alias for *lpad*

**rjust** alias for *rpad*

## Roadmap ##

* Resolve problem with function names crossing between libraries (include, contains and etc).

Any suggestions or bug reports are welcome. Just email me or more preferably open an issue.

## Changelog ##

### 1.1.4 ###

* Added pad, lpad, rpad, lrpad methods and aliases center, ljust, rjust
* Integration with Underscore 1.1.6

### 1.1.3 ###

* Added methods: underscored, camelize, dasherize
* Support newer version of npm

### 1.1.2 ###

* Created functions: lines, chars, words functions

### 1.0.2 ###

* Created integration test suite with underscore.js 1.1.4 (now it's absolutely compatible)
* Removed 'reverse' function, because this function override underscore.js 'reverse'

## Contributors list ##

*  Esa-Matti Suuronen <esa-matti@suuronen.org> (<http://esa-matti.suuronen.org/>),
*  Edward Tsech <edtsech@gmail.com>,
*  Sasha Koss <kossnocorp@gmail.com> (<http://koss.nocorp.me/>),
*  Vladimir Dronnikov <dronnikov@gmail.com>,
*  Pete Kruckenberg (<https://github.com/kruckenb>),
*  Paul Chavard <paul@chavard.net> (<http://tchak.net>),
*  Ed Finkler <coj@funkatron.com> (<http://funkatron.com>)

## Licence ##

The MIT License

Copyright (c) 2011 Eduard Tsech edtsech@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

