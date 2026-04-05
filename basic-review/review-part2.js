//! This is a basic review of the JS language fundementals and its algorithms:

//* getTwoSum using the two-pointer technique for efficieny
const getTwoSum = (arr, k) => {
    // strict validation of the arr argh and k target value integer which equals to the sum of two element within the iterable:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new RangeError('every element of the array must be a finite number!');
    if (arr.length < 2) throw new RangeError('array must contain at least 2 elements to be valid');
    if (typeof (k) !== 'number') throw new TypeError('k target argh must be a number');

    //* this snippet ensures that the array iterable is sorted in ascending order,
    // this return an true as an iterable!
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            throw new Error('array must be sortd for the iterable!');
        }
    }

    // initialize the two pointers for the two pointer technique:
    let left = 0;
    let right = arr.length - 1;

    // while conditional loop:
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === k) {
            // return as an object for completeness:
            return {
                indices: [left, right],
                values: [arr[left], arr[right]]
            }
        } else if (sum < k) {
            left++;
        } else {
            right--;
        }
    }
    // else return the default if no values have been found that are equal to the two sum value, null is a cleaner return statement!
    return null;
}

console.log(getTwoSum([1, 3, 4, 7, 9], 13));

//* this is another variation that uses global map object for easier hash based acces to the values:
const getTwoSumMap = (arr, k) => {
    // need to init the map global object:
    let seen = new Map();

    // NOTE same rules apply for checking is the iterable array is sorted or not!
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            throw new Error('array must be sortd for the iterable!');
        }
    }

    // main logic in using the map global object!
    for (let i = 0; i < arr.length; i++) {
        const complement = k - arr[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        } else {
            seen.set(arr[i], i);
        }
    }
    return null;
}

console.log(getTwoSumMap([1, 3, 4, 7, 9], 13));

//! Sliding window is one of the most important technique is wish to 'slice' iterables and check as you go to maintain efficiency is order to minimize the 'search area':

//* One of the core implementations of the sliding window is getting maxSumSubarray, if the subarray can only be k size which is the maximum sum allowed in the iterable!
const maxSumSubarray = (arr, k) => {
    // validate inputs:
    if (!Array.isArray(arr)) {
        throw new TypeError('arr must be an array');
    }
    if (!arr.every(num => typeof num === 'number' && Number.isFinite(num))) {
        throw new TypeError('every element in arr must be a finite number');
    }
    if (!Number.isInteger(k)) {
        throw new TypeError('k must be an integer');
    }
    if (k <= 0) {
        throw new RangeError('k must be greater than 0');
    }
    if (k > arr.length) {
        throw new RangeError('k cannot be greater than array length');
    }

    // build the first window:
    // NOTE the window is a fixed at 3 in this example so this is a fixed window sliding window example!
    let windowSum = 0;
    
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;
    let left = 0;

    // slide the window:
    for (let right = k; right < arr.length; right++) {
        windowSum += arr[right]; // add new right value:
        windowSum -= arr[left] // remove the old left value:
        left++;

        // get the Math.max value from the maxSum, or the windowSum vars!
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// the expected output of this function is 9! 
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));
