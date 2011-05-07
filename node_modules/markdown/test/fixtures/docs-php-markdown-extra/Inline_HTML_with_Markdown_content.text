# Markdown inside code blocks

<div markdown="1">
foo
</div>

<div markdown='1'>
foo
</div>

<div markdown=1>
foo
</div>

<table>
<tr><td markdown="1">test _emphasis_ (span)</td></tr>
</table>

<table>
<tr><td markdown="span">test _emphasis_ (span)</td></tr>
</table>

<table>
<tr><td markdown="block">test _emphasis_ (block)</td></tr>
</table>

## More complicated

<table>
<tr><td markdown="1">
* this is _not_ a list item</td></tr>
<tr><td markdown="span">
* this is _not_ a list item</td></tr>
<tr><td markdown="block">
* this _is_ a list item
</td></tr>
</table>

## With indent

<div>
    <div markdown="1">
    This text is no code block: if it was, the 
    closing `<div>` would be too and the HTML block 
    would be invalid.

    Markdown content in HTML blocks is assumed to be 
    indented the same as the block opening tag.

    **This should be the third paragraph after the header.**
    </div>
</div>

## Code block with rogue `</div>`s in Markdown code span and block

<div>
    <div markdown="1">

    This is a code block however:

        </div>

    Funny isn't it? Here is a code span: `</div>`.

    </div>
</div>

<div>
  <div markdown="1">
    * List item, not a code block

Some text

      This is a code block.
  </div>
</div>

## No code block in markdown span mode

<p markdown="1">
    This is not a code block since Markdown parse paragraph 
    content as span. Code spans like `</p>` are allowed though.
</p>

<p markdown="1">_Hello_ _world_</p>

## Preserving attributes and tags on more than one line:

<p class="test" markdown="1" 
id="12">
Some _span_ content.
</p>


## Header confusion bug

<table class="canvas">
<tr>
<td id="main" markdown="1">Hello World!
============

Hello World!</td>
</tr>
</table>
