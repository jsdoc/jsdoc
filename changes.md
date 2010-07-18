Defining the Namepath of an Inner Symbol
---

[change] The namepath of an inner symbol is now delimited by the tilde character
instead of the dash. If you wrote `@name Myclass-innerProperty` in version 2,
you would write `@name Myclass~innerProperty` in version 3. This change was
added to avoid conflicts with the new symbol categories of "module" and "file",
both of which have names corresponding to their file paths; the dash character
is common in filepaths.

Allowing Strings in Namepaths
---

[new] If a section of a namepath is meant to be atomic, that is it should always
be kept together and its inner characters _not_ interpretted, you can surround
that section with quotes. For example the hash character normally has special
meaning within a namepath, but here we tell JSDoc to treat "#channel" as an
uninterpretted, atomic string in the namepath.

	/**
		@namespace
		@name chat."#channel"
	 */
	chat['#channel'] = {};
	
	
	/**
		@property
		@type {boolean}
		@name chat."#channel".open
	 */
	chat['#channel'].open = true;

Support For E4X
---

[new] As a benefit of using Rhino's own JavaScript parser, JSDoc has inherited
the ability to parse any source code that Rhino can parse, including the latest
syntax patterns like E4X (ECMAScript for XML).