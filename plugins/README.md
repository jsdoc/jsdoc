Adding a Plugin
----

There are two steps required to install a new plugin:

1. Create a JavaScript module to contain your plugin code.
2. Include the name of that module in the "plugins" array of `conf.json`.

For example, if your plugin source code was saved in the  "plugins/shout.js"
file, you would include it in conf.json like so:
    
    {
        "plugins": [
            "plugins/shout"
        ]
    }

Authoring JSDoc 3 Plugins
----

The plugin system for JSDoc 3 is event-based, meaning you register an interest
in a specific named-event with a handler function that will be called by JSDoc
whenever that event occurs. JSDoc will pass an event object into your handler as
the argument: this can be used to access information about the event.

For example, to handle events fired whenever a new doclet is created by JSDoc,
you would add a handler for the "newDoclet" event to your plugin's exported
functions, like so:

    exports.newDoclet = function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish
        if (typeof e.doclet.description === 'string') {
            e.doclet.description = e.doclet.description.toUpperCase();
        }
    };
