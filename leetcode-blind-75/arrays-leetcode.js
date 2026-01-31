//! This is a the blind leetcode for the arrays:

/* ===============================
    LC 1 — Two Sum
    Find two indices whose values sum to target.
================================ */
const twoSum = (arr, k) => {
    //* Strict validation of the array object and k target: 
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object');
    if (arr.length < 2) throw new RangeError('must contain at least 2 elements');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new TypeError('every element must be a finite number');
    if (typeof (k) !== 'number' || !Number.isFinite(k)) throw new TypeError('k argh must be a number value object and finite');

    // init the two pointers of the array:
    let left = 0, right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === k) {
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
    // otherwise return null value if not in the array:
    return null;
}
console.log(twoSum([2, 7, 11, 15], 9));   // [0,1]

//* this is an alternate solution using the Map global object to solve the algorithm in question i.e. twoSumMap:
const twoSumMap = (arr, k) => {
    //^ init the global map object which serves like an { object } and/or hash map:
    const seen = new Map();

    // NOTE make sure to memorize this code as it is important on how to access and set hash maps:
    for (let i = 0; i < arr.length; i++) {
        const complement = k - arr[i];

        if (seen.has(complement, i)) {
            return [seen.get(complement), i]
        } else {
            seen.set(arr[i], i)
        }
    }

    return null;
}

console.log(twoSumMap([3, 2, 4], 6));       // [1,2]

// ! Hash Map review, from basic to advanced: 
// for example the frequency count of the 'string' or array:
const freqCount = (str) => {
    const seen = new Map();

    for (let s of str) {
        seen.set(s, (seen.get(s) || 0) + 1);
    }

    return seen;
}

console.log(freqCount('cool'));

//! End of review for the hash-maps:

/* ===============================
    LC 121 — Best Time to Buy and Sell Stock
    Maximize profit from one buy/sell.
================================ */
const maxProfit = (arr) => {
    // strict validation of the array argh:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new RangeError('every element of the arr argh must be a finite number');
    if (arr.length < 2) throw new RangeError('must contain at least 2 elements within the arr argh');

    // init the initial default variables:
    let minPrice = Infinity;
    let maxProfit = 0;

    // NOTE make a note of the this synthax and for loop 'of' accesses the values 'in' accesses the indicies of the object iterable:
    for (let price of arr) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            let profit = price - minPrice;
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5

/* ===============================
    LC 217 — Contains Duplicate
    Return true if any value appears twice.
================================ */
const containsDuplicate = (arr) => {
    const set = new Set(arr);
    if (set.size < arr.length) {
        return true;
    } else {
        return false;
    }
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false

//! This is a variation of the contains duplicates but with an early exit for more efficient algorithm:
//* this functions exists early and is bit more efficient than the above function:
containsDuplicateEarlyExit = (arr) => {
    const seen = new Set();
    for (const x of arr) {
        if (seen.has(x)) return true;
        seen.add(x);
    }
    return false;
}

console.log(containsDuplicateEarlyExit([1, 2, 3, 1])); // true
console.log(containsDuplicateEarlyExit([1, 2, 3, 4])); // false


/* ===============================
    LC 238 — Product of Array Except Self
    Return product of all elements except itself.
================================ */
//! this requires the prefix and suffix synthaxes, and Return an array where each index i contains the product of all numbers except nums[i], without using division:
const productExceptSelf = (arr) => {
    let n = arr.length;
    const result = new Array(n).fill(1);

    // build a prefix products:
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix = prefix * arr[i];
    }

    // build a suffix products:
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] = result[i] * suffix;
        suffix = suffix * arr[i];
    }
    return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]

/* ===============================
    LC 53 — Maximum Subarray
    Find subarray with largest sum.
================================ */
// NOTE this is Kadane's algorithm, this is an important algorthm so take a note and memorize it:
const maxSubArray = (arr) => {
    let best = arr[0];
    let current = arr[0];

    // count from the 1st index which is the 2nd value within the array object:
    for (let i = 1; i < arr.length; i++) {
        current = Math.max(arr[i], current + arr[i]);
        best = Math.max(best, current);
    }
    return best;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

/* ===============================
    LC 152 — Maximum Product Subarray
    Find subarray with largest product.
================================ */
const maxProduct = (arr) => {
    // init the default vars for the function: grab and init the 1st element to default vars:
    let maxSoFar = arr[0];
    let minSoFar = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];

        // swap only if current is negative:
        if (current < 0) {
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
        }

        // always update:
        maxSoFar = Math.max(current, maxSoFar * current);
        minSoFar = Math.min(current, minSoFar * current);
        result = Math.max(result, maxSoFar);
    }
    return result;
}
console.log(maxProduct([2, 3, -2, 4])); // 6

/* ===============================
    LC 153 — Find Min in Rotated Array
    Return the minimum element.
================================ */
const findMin = (arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if (arr[mid] > arr[right]) {
            left = mid + 1; // min is in the right half:
        } else {
            right = mid; // min is at the mid or in the left half:
        }
    }
    return arr[left];
}
console.log(findMin([3, 4, 5, 1, 2]));     // 1

/* ===============================
    LC 33 — Search in Rotated Array
    Return index of target or -1.
================================ */
const searchRotated = (arr, k) => {

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if (arr[mid] === k) {
            return mid;
        } 

        // left half is sorted:
        if (arr[left] <= arr[mid]) {
            if (arr[left] <= k && k <= arr[right]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        // right half is sorted:
        } else {
            if (arr[mid] < k && k <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return - 1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4

/* ===============================
    LC 15 — 3Sum
    Return all triplets that sum to 0.
================================ */
const getThreeSum = (arr) => {
    //! strict validation of the array argh input:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new TypeError('every element of the array must be a finite number');
    if (arr.length < 3) throw new RangeError('arr argh must contain at least 3 elements to be valid');
    
    //* sort the argh array in ascending order: safe sort.
    arr = [...arr].sort((a, b) => a - b);
    const result = [];

    //* this loop will grab the first 3 elements:
    for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        let left = i + 1;
        let right = arr.length - 1;


        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];

            if (sum === 0) {
                // NOTE make sure to push triplets instead of values:
                result.push([arr[i], arr[left], arr[right]]);

                // skip duplicate left values:
                while (left < right && arr[left] === arr[left + 1]) {
                    left++;
                }
                while (left < right && arr[right] === arr[right - 1]) {
                    right--;
                }
                left = left + 1;
                right = right - 1;
            } else if (sum < 0) {
                left = left + 1;
            } else {
                right = right - 1;
            }
        }
    }
    return result;
}

console.log(getThreeSum([-1, 0, 1, 2, -1, -4]));
// [[-1,-1,2], [-1,0,1]]


/* ===============================
    LC 11 — Container With Most Water
    Max area between two heights.
================================ */
//^ this involves the two pointer technique which is a proper technique for this algorithm:
const maxArea = (height) => {
    // init the initial values, the default tracking values:
    let left = 0;
    let right = height.length - 1;
    let best = 0;

    while (left < right) {
        let width = right - left;
        let h = Math.min(height[left], height[right]);
        best = Math.max(best, h * width);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49


/* ===============================
    LC 42 — Trapping Rain Water
    Compute trapped water amount.
================================ */
//* Traping the rainwater:
const trapRainWater = (height) => {
    // some validation of the entry array argh input:
    if (!Array.isArray(height) || height.length < 3) return 0;

    let left = 0;
    let right = height.length - 1;

    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater = totalWater + (leftMax - height[left]);
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right]
            } else {
                totalWater = totalWater + (rightMax - height[right]);
            }
            right--;
        }
    }
    return totalWater;
}

console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6


/* ===============================
    LC 704 — Binary Search
    Return index of target in sorted array.
================================ */
//* One of the most fundemental binarySearch 
const binarySearch = (arr, k) => {
    // make sure that the array is sorted: in place safe sort
    arr = [...arr].sort((a, b) => a - b);

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === k) {
            return mid;
        } else if (k < arr[mid]) {
            right = mid - 1; // move left:
        } else {
            left = mid + 1;  // move right:
        }
    }
    // otherwise return -1:
    return - 1;
};

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // 4

/* ===============================
    LC 128 — Longest Consecutive Sequence
    Length of longest consecutive run.
================================ */
//! This function/algorithm uses set object to hold unique values:
const longestConsecutive = (arr) => {
    // strict validation of the array object input:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object input:');
    if (arr.length === 0) throw new RangeError('arr argh cannot be empty');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new TypeError('every element within the array must be a finite number!');
    
    // create a set object to hold unique values only:
    const set = new Set(arr);
    let best = 0;

    for (let x of set) {
        // only start counting at the beginning of a sequence:
        if (!set.has(x - 1)) {
            let length = 1;
            let current = x;

            while (set.has(current + 1)) {
                current++;
                length++;
            }
            best = Math.max(best, length);
        }
    }
    return best;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4