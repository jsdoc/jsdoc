/**
 * @interface
 */
class IWorker {
    /** Interface for doing some work. */
    work() {}
}

/**
 * @implements {IWorker}
 */
class MyWorker {
    /** Do some work. */
    work() {}

    /** Process a thing. */
    process() {}
}

/**
 * @implements {IWorker}
 */
class MyIncompleteWorker {}
