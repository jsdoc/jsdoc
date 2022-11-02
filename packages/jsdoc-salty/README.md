# Salty

Salty is a drop-in replacement for (some of) [TaffyDB](https://github.com/typicaljoe/taffydb). It
supports only the TaffyDB features that JSDoc has historically used.

## Why Salty?

TaffyDB lets you query an array of objects, similar to the way you would query a database. JSDoc 3.x
used TaffyDB to manage _doclets_, or objects that contain information about your code.

Specifically, after JSDoc parsed your code, it passed the doclets to your JSDoc template as a
TaffyDB object. The template then used TaffyDB queries to remove unneeded doclets, and to retrieve
the doclets that were needed to generate documentation.

Salty exists because TaffyDB is no longer maintained and is the subject of a
[CVE](https://www.cve.org/CVERecord?id=CVE-2019-10790), causing TaffyDB to be flagged as a security
risk. There's no real security risk, but it sure looks like there is.

Also, TaffyDB [can't decide what license it uses](https://github.com/typicaljoe/taffydb/issues/166):

+ The [README](https://github.com/typicaljoe/taffydb/blame/d4870cee370abffe510ba598b02e4e7ad6af5d2a/README.md#L146-L156)
  says that TaffyDB uses the [1-clause BSD License](https://opensource.org/licenses/BSD-1-Clause).
+ The [`package.json` file](https://github.com/typicaljoe/taffydb/blob/d4870cee370abffe510ba598b02e4e7ad6af5d2a/package.json#L32)
  says that TaffyDB uses the [2-clause BSD License](https://opensource.org/licenses/BSD-2-Clause).
+ The [`License` file](https://github.com/typicaljoe/taffydb/blob/d4870cee370abffe510ba598b02e4e7ad6af5d2a/License)
  says that TaffyDB uses the [MIT License](https://opensource.org/licenses/MIT).

By replacing TaffyDB with Salty, which uses the
[Apache 2.0 License](https://github.com/jsdoc/jsdoc/blob/main/packages/jsdoc-salty/LICENSE), JSDoc
resolved the purported security issue and the licensing uncertainty.

## Use Salty in a JSDoc template

Starting in version 4.0.0, JSDoc no longer uses the `taffydb` package as a dependency. If you use a
JSDoc template that comes with JSDoc 4.0.0 or later, then you don't need to make any changes to the
template.

Otherwise, your template might use the `taffydb` package. After you replace `taffydb` with
`@jsdoc/salty`, your template should remain compatible with JSDoc 3.x.

To replace `taffydb` with `@jsdoc/salty`, do the following:

1.  In the template's `publish.js` file, find the line or lines that require `taffydb`. They should
    look similar to one of the following:

    ```js
    // Old-school, without object destructuring (might use `var` or `let` instead of `const`)
    const taffy = require('taffydb').taffy;
    // New-school, with object destructuring
    const { taffy } = require('taffydb');
    ```

2.  Replace `taffydb` with `@jsdoc/salty`:

    ```js
    // Old-school, without object destructuring
    const taffy = require('@jsdoc/salty').taffy;
    // New-school, with object destructuring
    const { taffy } = require('@jsdoc/salty');
    ```

3.  If the template has a `package.json` file that includes `taffydb` as a dependency, then remove
    the `taffydb` dependency.

4.  In the template's `package.json` file, add `@jsdoc/salty` as a dependency.

5.  Run `npm install` in the template directory, then confirm that the template works as expected.

## Supported TaffyDB features

Salty supports only the TaffyDB features that have historically been used by JSDoc templates. That
means that most TaffyDB functionality is missing.

Specifically, Salty lets you do the following:

### Create a database

```js
let db = taffy([{ a: 3 }, { a: 1, b: 'hello' }, { a: 7, b: 2 }]);
```

### Sort items in a database

Items are sorted in place. Salty uses the following sort order, which differs from, but is more
predictable than, TaffyDB:

1.  Non-null, non-undefined values, in standard sort order
2.  Null values
3.  Explicitly undefined values: key is present, value is undefined
4.  Implicitly undefined values: key is not present

```js
// Sort by the `a` property
db.sort('a');
// Sort by the `a` property, then the `b` property
db.sort('a, b');
```

### Get items from a database

```js
// Get array of all items
const emptyMatcher = db().get();
// Get array of items where `a` is either `1` or `3`
const arrayMatcher = db({ a: [1, 3] }).get();
// Get array of items where `a` is `1` and `b` is `hello`
const multiMatcher = db({ a: 1 }, { b: 'hello' }).get();
// Get array of items where `b` is undefined
const undefinedMatcher = db({ b: { isUndefined: true } }).get();
```

### Get items with a custom query function

Within the query function, `this` is bound to the current item. As a result, the custom query
function cannot be an arrow function.

```js
function query() {
  return this.a > 1;
}

const items = db(query).get();
// `items` is `[{ a: 3 }, { a: 7, b: 2 }]`
```

### Iterate over items in a database

```js
// Iterate over all items
db().each((item, i) => console.log(`'b' property at index ${i}: ${item.b}`));
// Iterate over items where `b` equals `hello`
db({ b: 'hello' }).each((item) => console.log(`'a' property: ${item.a}`));
```

### Remove items from a database

```js
// Remove items where `a` equals `7`
db({ a: 7 }).remove(); // returns `1` (the number of items removed)
// Remove items where `b` is undefined
db({ b: { isUndefined: true } }).remove(); // returns `1`
// Remove all items
db().remove();
```

## New features

Salty probably won't gain any new features, ever. It exists solely to meet the requirements of
JSDoc.

The exception is if a JSDoc template uses TaffyDB features that aren't available in Salty. If that's
the case, [create an issue](https://github.com/jsdoc/jsdoc/issues) with details about the template
you're using and the feature that's missing.

## TaffyDB, JSDoc, and security

Is TaffyDB a security risk? And has JSDoc ever used TaffyDB in a way that creates a security risk?
The answer to both questions is no.

First, [CVE-2019-10790](https://www.cve.org/CVERecord?id=CVE-2019-10790) says that "attackers can
use [the TaffyDB] vulnerability to access any data items in the DB." But JSDoc used TaffyDB only to
store data about your JavaScript code. That data is no more sensitive than the code itself.

Also, JSDoc doesn't persist the TaffyDB data to disk. It exists only while JSDoc is running.

Most important of all, TaffyDB doesn't pretend to have any sort of access control. To the contrary,
TaffyDB _intentionally_ makes it very easy to access all of the data in a DB. If your DB is stored
in a variable named `db`, then calling `db().get()` retrieves all of the data in the DB.
[This method is documented](https://taffydb.com/working_with_data.html) as the "[p]refered [sic]
method for extracting data." Because you can always access _all_ of the data, it's unclear why a bug
that lets you access _some_ of the data would create a security risk.

So Salty doesn't mitigate a security risk or fix a security issue. However, in general, it's not a
good idea to tell people to ignore CVEs; also, it can be difficult to convince your colleagues or
employer to ignore a specific CVE. For those reasons, it was worth the trouble to replace TaffyDB.

## What's with the name?

It's a play on "saltwater taffy." Hilarious!

