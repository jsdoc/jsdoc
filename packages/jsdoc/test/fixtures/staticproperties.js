/** Sample class with static and instance properties. */
class TestClass {
    /** Instance property. */
    instanceProp = 'instance';

    /** Static property. */
    static staticProp = 'static';

    /** Static getter. */
    static get staticGetter() {
        return 'static getter';
    }

    /** Static setter. */
    static set staticSetter(value) {
        // setter logic
    }

    /** Instance method. */
    instanceMethod() {
        return 'instance method';
    }

    /** Static method. */
    static staticMethod() {
        return 'static method';
    }
}
