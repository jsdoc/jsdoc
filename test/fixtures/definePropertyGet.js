/** @class */
function Foo() {}

/** Define the 'bar' property getter  */
Object.defineProperty(Foo.prototype, 'bar', {
    get: function() {
        return this._bar;
    }
});
