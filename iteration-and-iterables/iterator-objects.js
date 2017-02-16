const Stack2 = () => ({
    array: [],
    index: -1,
    push(value) {
        return this.array[this.index += 1] = value;
    },
    pop() {
        const value = this.array[this.index];

        this.array[this.index] = undefined;

        if (this.index >= 0) {
            this.index -= 1;
        }

        return value;
    },
    isEmpty() {
        return this.index < 0;
    },
    iterator() {
        const self = this;
        let iterationIndex = this.index;

        return {
            next() {
                if (iterationIndex > self.index) {
                    iterationIndex = self.index;
                }

                if (iterationIndex < 0) {
                    return { done: true };
                } else {
                    return { done: false, value: self.array[iterationIndex--] };
                }
            }
        };
    }
});

const stack = Stack2();

stack.push(2000);
stack.push(10);
stack.push(5);

const collectionSum = (collection) => {
    const iterator = collection.iterator();

    let eachIteration,
        sum = 0;

    while ((eachIteration = iterator.next(), !eachIteration.done)) {
        sum += eachIteration.value;
    }

    return sum;
}

console.log(collectionSum(stack));

