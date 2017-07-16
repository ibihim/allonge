'use strict';

const makeQueue = () => ({
    array: [],
    head: 0,
    tail: -1,
    pushTail(value) {
        this.tail += 1;
        this.array[this.tail] = value;

        return value;
    },
    pullHead() {
        if (this.tail >= this.head) {
            const value = this.array[this.head];

            this.array[this.head] = undefined;
            this.head += 1;

            return value;
        }
    },
    isEmpty() {
        return this.tail < this.head;
    }
});

module.exports = { makeQueue };

