/** @class */
function Foo() {}

/** Define the 'bar' property */
Object.defineProperty(Foo.prototype, 'bar', {
    /** Define the 'bar' property getter */
    get: function() {
        return this._bar;
    }
});
