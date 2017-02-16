// Tail-Recursive Style, but entangles mechanism
// of traversing the array with the business of
// summing the bits
const arraySum = ([ first, ...rest ], accumulator = 0) =>
    first === undefined
        ? accumulator
        : arraySum(rest, first + accumulator);

const result1 = arraySum([1, 4, 9, 16, 25]);


// Seperate by using fold
const callLeft = (fn, ...args) => // pipe
    (...remainingArgs) =>
        fn(...args, ...remainingArgs);

const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
    first === undefined
        ? terminalValue
        : fn(first, foldArrayWith(fn, terminalValue, rest));

// concerns itself with summing and not with traversing over a collection of data
// but still relies on foldArrayWith, so it can only sum arrays
const arraySum = callLeft(foldArrayWith, (a, b) => a + b, 0);

arraySum([1, 4, 9, 16, 25]);


// Even more decoupled
const callRight = (fn, ...args) => // compose
    (...remainArgs) =>
        fn(...remainArgs, ...args);

// turning an array into a function 
const foldArray = (array) => callRight(foldArrayWith, array);
// doesn't care what kind of data structure we have, as long it's foldable
const sumFoldable = (folder) => folder((a, b) => a + b, 0);

sumFoldable(foldArray([1, 4, 9, 16, 25]));


// Trees
const foldTreeWith = (fn, terminalValue, [first, ...rest]) =>
    first === undefined
        ? terminalValue
        : Array.isArray(first)
            ? fn(
                    foldTreeWith(fn, terminalValue, first), 
                    foldTreeWith(fn, terminalValue, rest)
                )
            : fn(first, foldTreeWith(fn, terminalValue, rest));
