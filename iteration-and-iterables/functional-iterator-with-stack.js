// Stack that has its own functional iterator method:

const Stack1 = () => ({
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
        // every time iterator is called, we get the values anew
        let iterationIndex = this.index;

        // JS doesn't bind this within a fat arrow function
        // therefor it checks the enclosing environment
        // therefor you don't need to bind the result of .iterator()
        return () => {
            // In case the index changed in the mean time
            if (iterationIndex > this.index) {
                iterationIndex = this.index;
            }

            if (iterationIndex < 0) {
                return { done: true };
            } else {
                return {
                    done: false,
                    value: this.array[iterationIndex--]
                };
            }
        }
    }
});

const stack1 = Stack1();

stack1.push('Greetings');
stack1.push('to');
stack1.push('you!');

const iter = stack1.iterator();
console.log(iter().value); // => "you!"
console.log(iter().value); // => "to"

// sum function over a functional iterator
const iteratorSum = (iterator) => {
    let eachIteration,
        sum = 0;

    while ((eachIteration = iterator(), !eachIteration.done)) {
        sum += eachIteration.value;
    }

    return sum;
}

const stack2 = Stack1();

stack2.push(1);
stack2.push(2);
stack2.push(3);

console.log(iteratorSum(stack2.iterator())); // => 6

// folds over any object, provided the object implements an .iterator method:
const collectionSum = (collection) => {
    const iterator = collection.iterator();

    let eachIteration,
        sum = 0;

    while ((eachIteration = iterator(), !eachIteration.done)) {
        sum += eachIteration.value;
    }

    return sum;
}

console.log(collectionSum(stack2)); // => 6

