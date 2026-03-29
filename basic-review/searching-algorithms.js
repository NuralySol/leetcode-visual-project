//! One of the most fundemental and easiest to implement searching algorithm is a linear search if the iterable is already sorted, the time complexity of this algorithm is a linear O(n):

const linearSearch = (arr, k) => {
    // validation of the array and k target value
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object');
    if (arr.length < 2) throw new RangeError('arr argh must have a range of more than 2');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new TypeError('every element of the arr argh must be a finite number');
    if (typeof (k) !== 'number') throw new TypeError('k argh must be a number');

    for (let i = 0; i < arr.length; i++) {
        if (k === arr[i]) {
            return {
                index: i,
                value: arr[i]
            };
        }
    };
    return null;
};

console.log(linearSearch([1, 2, 5, 7, 11, 12, 15], 12));

//! binary search is the most fundemental of iterable searches: 
const binarySearch = (arr, k) => {

    validateArgs(
        { arr, k },
        { minLength: 1, requireK: true }
    );
    assertSorted(arr);

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === k) {
            return mid;
        } else if (arr[mid] < k) {
            left = mid + 1;
        } else {
            right = mid - 1; 
        }
    }
    return - 1;
};

console.log(binarySearch([1, 3, 5, 11, 13, 15, 20], 3));

//* NOTE this is a helper function that validates the common inputs for the array arghs and k target values:
//* Helper validator for common algorithm arguments
function validateArgs({ arr, k, target }, options = {}) {

    const {
        minLength = 0,
        numericArray = true,
        requireK = false,
        requireTarget = false,
        integerK = false
    } = options;

    // Validate array
    if (!Array.isArray(arr)) {
        throw new TypeError("arr must be an array");
    }

    if (arr.length < minLength) {
        throw new RangeError(`arr must contain at least ${minLength} element(s)`);
    }

    if (numericArray && !arr.every(Number.isFinite)) {
        throw new TypeError("arr must contain only finite numbers");
    }

    // Validate k
    if (requireK) {
        if (!Number.isFinite(k)) {
            throw new TypeError("k must be a finite number");
        }

        if (integerK && !Number.isInteger(k)) {
            throw new TypeError("k must be an integer");
        }
    }

    // Validate target
    if (requireTarget) {
        if (!Number.isFinite(target)) {
            throw new TypeError("target must be a finite number");
        }
    }
}
// NOTE this function to assert if the array is sorted or not: it a custom helper validation for especially if you wish to check if the array is sorted or not!
function assertSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            throw new Error("arr must be sorted for binary search");
        }
    }
}

