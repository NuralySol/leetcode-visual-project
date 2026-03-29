//! This is a basic and an advanced review material for the JS language.

//* binary search is one of the most fundemental searching algorithms which works like a phone book discarding halves since we know that the iterable is sorted or must be sorted in order to proceed like a phone book which is sorted alphbetically.

// NOTE the best practice for validation is 
/*
---------
1. Type
2 Structure (length)
3. Content
---------- 
*/
//^ END OF NOTES:



//! binary search takes in two arghs as defined in the params of arr, k: 
const binarySearch = (arr, k) => {
    //* strict validation of the arr arghs and k target value:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(Number.isFinite)) throw new TypeError('every element in arr must be a finite number');
    if (arr.length < 2) throw new RangeError('arr argh must contain at least 2 elements');
    if (typeof k !== 'number' || !Number.isFinite(k))
        throw new TypeError('k must be a finite number');

    // sort the array argh since it is not sorted in any way:
    arr = [...arr].sort((a, b) => a - b);

    // init the left and the right pointers:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // get the midpoint of the iterable:
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
}

// NOTE !sorted MUST be sorted before hand, passing in array of nums and k-target int
console.log(binarySearch([1, 3, 11, 4, 6, 8, 15], 8));

//* This is an advanced binary search example which preserves the original index:
const binarySearchWithIndex = (arr, k) => {
    const indexed = arr.map((val, idx) => ({ val, idx }))
        .sort((a, b) => a.val - b.val);

    let left = 0;
    let right = indexed.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (indexed[mid].val === k) {
            return indexed[mid].idx;
        }
        if (indexed[mid].val < k) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};

//! This function will keep the original index address and will ONLY find the element within the original index value:
console.log(binarySearchWithIndex([1, 4, 3, 2, 11, 16, 15], 3));

//* function to check if the array is sorted or not:
const isSortedArray = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return { sorted: true, arr };
}

console.log(isSortedArray([1, 3, 4, 5]))

//* one of the most simpler and the educational searching algorithms which finds element in lienar time if the iterable is sorted, we assume that the iterable is sorted.
const linearSearch = (arr, k) => {
    // iterate through the array and find the element:
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === k) {
            return { index: i, value: arr[i] };
        }
    }
    // fallback return statement:
    return null;
}

console.log(linearSearch([1, 3, 4, 5, 11, 15], 11));

//* hash Based search is very fast O(1) in constant time complexity: BUT returns a boolean!
const searchHash = (arr, target) => {
    const set = new Set(arr);
    return set.has(target);
}

console.log(searchHash([1, 2, 3, 4, 5, 6], 5))

//! Search in a rotated array!
// Given a sorted array that has been rotated!
// Original sorted:
// [1, 3, 5, 7, 9, 11]

// Rotated:
// [7, 9, 11, 1, 3, 5]
//! Time complexity is O(log n), space complexity O(1) constant!
const searchRotated = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Found target
        if (arr[mid] === target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            // Target is inside left sorted half
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
};

console.log(searchRotated([7, 9, 11, 1, 3, 5], 3)); 