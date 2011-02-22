
var Person = makeClass(
    /** @lends Person# */
    {
        /** @constructs Person */
        initialize: function(name) {
            /** The name of the person. */
            this.name = name;
        },
        
        /** Speak a message. */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);