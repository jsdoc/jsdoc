/**
 * Enum for tri-state values.
 * @enum {number}
 */
var TriState = {
    /** true */
    TRUE: 1,
    FALSE: -1,
    /** @type {boolean} */
    MAYBE: true
};

/**
 * Numeric enum for true/false values.
 * @enum {boolean}
 */
var TrueFalseNumeric = {
    /** false */
    0: false,
    1: true
};

/**
 * Enum with ignored entries.
 * @enum
 */
var SomeIgnored = {
    /** One */
    one: 1,
    /** Two
     * @ignore */
    two: 2,
    three: 3,
    /** @ignore */
    four: 4
};
