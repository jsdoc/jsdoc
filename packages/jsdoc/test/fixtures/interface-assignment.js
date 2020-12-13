/** @namespace */
const myCorp = {};

/**
 * @interface
 */
myCorp.IWorker = class IWorker {
    constructor(workerName) {
        /** Name of the worker. */
        this.workerName = workerName;
    }

    /** Interface for doing some work. */
    work() {}
};
