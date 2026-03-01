//! 02/28/2026: This is a basic review of algorithms and the techniques of the JS language with the focus on algorithmic solutions from basic to advanced problems. 

//* The classic problem is the getTwoSum problem using the 2-pointer technique, simple basic and elegant:

const getTwoSum = (arr, k) => {
    //* strict validation of the array arghs and k numeric arghs:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' || !Number.isFinite(item))) {
        throw new TypeError('every element of the array object must be a finite number');
    }
    if (arr.length < 2) throw new RangeError('arr argh must contain at 2 elements');
    if (typeof (k) !== 'number' && Number.isFinite(k)) throw new TypeError('k must be a number');

    //NOTE since the array is not sorted we need to sort the array:
    arr = [...arr].sort((a, b) => a - b);

    let left = 0;
    let right = arr.length - 1;

    // while loop with the condition in order to grab the individual elements within the argh array:
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === k) {
            // modified return to return target elements as well as the indices of these elements:
            return {
                arrayModifed: true,
                indices: [left, right],
                values: [arr[left], arr[right]]
            };
        } else if (sum < k) {
            left++;
        } else {
            right--;
        }
    }
    // else return the baseline statement:
    return 'no two elements equal to the sum target';
};

// NOTE this is an unsorted array with the argh that equals to the two elements within the array:
console.log(getTwoSum([1, 11, 2, 7, 9, 100], 111));

//! This is another variation of the twoSum function but using the Map() global object instead: No validation for this function we assume that the array argh is correct and sorted and k target exists within the array elements!

// TODO try to implement the counter for the values and the return the values as well as the target indices for a more complete return, also create a custom function which validates the array and k target so that we adhere to the DRY principle. 

const getTwoSumMap = (arr, k) => {
    const n = arr.length;
    const seen = new Map();

    for (let i = 0; i < n; i++) {
        const complement = k - arr[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        } else {
            seen.set(arr[i], i);
        }
    }
    return null;
}
// this function return the indices of the targets but not the values:
console.log(getTwoSumMap([1, 3, 6, 11, 15], 21));

//* a simple isEven return using the modulus operator!
const isEven = (num) => {
    return num % 2 === 0;
};

console.log(isEven(10));

const isOdd = (num) => {
    return num % 2 === 1;
};

console.log(isOdd(10));

//* return based on complex logic:
const canVote = (age, isCitizen) => {
    return age >= 18 && isCitizen;
};

console.log(canVote(21, true));

//* boolean casting if you want truthy/falsy into boolean:
const hasValue = (x) => {
    return Boolean(x);
}

console.log(hasValue(10));

// an example with an array: if it has a duplicate within the array:
const hasDuplicate = (arr) => {
    return new Set(arr).size !== arr.length;
};

console.log(hasDuplicate([1, 2, 3, 5, 1]));

//! Some other important concepts regarding the return logic of the JS language is:
// JS logical operators DONT return booleans - they return values.
const result = true && 'Hello';
console.log(result);

const getName = (name) => {
    return name || 'Guest';
};

console.log(getName('Nuraly'));
console.log(getName(''));

//* Early return (guard clauses):
function process(user) {
    if (!user) return 'Denied';
    if (!user.isActive) return 'Denied';
    return 'acessGranted!';
};

//! Functions can return complex values:
const calculate = (a, b) => {
    return {
        sum: a + b,
        diff: a - b,
        product: a * b
    }
}

console.log(calculate(5, 3).sum);
console.log(calculate(5, 3).diff);
console.log(calculate(5, 3).product);

//* Functions returning other functions:
const multuplyBy = (x) => {
    return function (y) {
        return x * y;
    }
}

const double = multuplyBy(2);
console.log(double(5));

//* implicit return of the array function:
const square = (x) => x * x;
console.log(square(5));

// returning in Recursion:
const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};
// 4 * 3 * 2 * 1; factorial function only works with recursion in the above case:
console.log(factorial(4));

//! There is a version of iterative function for calculating the factorials in JS as there is no operator for the factorial in the JS language:

const factorialIterative = (n) => {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Factorial only defined for non-negative integers');
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    };

    return result;
};

console.log(factorialIterative(5));
