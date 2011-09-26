 
/** @constructor */
function Data() {

    /**
        The current position.
        @enum {number}
    */
    this.point = {
        /** The x coordinate of the point. */
        x: 0,
        
        /** The y coordinate of the point. */
        y: 0
    };
}

/**
 * Enum for tri-state values.
 * @enum {number}
 */
TriState = {
    /** true */
    TRUE: 1,
    /** false */
    FALSE: -1,
    /** @type {boolean} */
    MAYBE: true
};