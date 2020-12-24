const Emittery = require('emittery');
const {default: ow} = require('ow');

module.exports = class Task extends Emittery {
    constructor(opts = {}) {
        let deps;

        super();

        ow(opts.name, ow.optional.string);
        ow(opts.func, ow.optional.function);
        ow(opts.dependsOn, ow.any(
            ow.optional.string,
            ow.optional.array.ofType(ow.string)
        ));

        if (typeof opts.dependsOn === 'string') {
            deps = [opts.dependsOn];
        } else if (Array.isArray(opts.dependsOn)) {
            deps = opts.dependsOn.slice(0);
        }

        this.name = opts.name || null;
        this.func = opts.func || null;
        this.dependsOn = deps || [];
    }

    run(context) {
        ow(this.name, ow.string);
        ow(this.func, ow.function);
        ow(this.dependsOn, ow.array.ofType(ow.string));

        this.emit('start', this);

        return this.func(context).then(
            () => {
                this.emit('end', this);

                return Promise.resolve();
            },
            error => {
                this.emit('error', {
                    task: this,
                    error
                });
                this.emit('end', this);

                return Promise.reject(error);
            }
        );
    }
};
