//! Merge Sort is a divide and conquer algorithm which splits the array in half-> sorts the both halves -> and then merges them.

//* The time complexity Big O of MergeSort is O(n log n). 

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

//* this is the helper function of the merge feeding into mergeSort main function:
const merge = (left, right) => {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }
    // spread the remaining elements:
    return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([8, 3, 5, 4, 7, 6, 1, 2]));

//! quickSort is also a divide and conquer algorithm which chooses a pivot and partitions array into smaller | pivot | larger  parts:

const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return arr;

    // NOTE Random pivot swap to prevent worst case scenarios:
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]]

    const pivotIndex = partition(arr, left, right);

    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);

    return arr;
}

//* this is a helper function which feeds itself into the main function of the quickSort:
const partition = (arr, left, right) => {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            // swap in place:
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]]
    return i;
};

console.log(quickSort([8, 3, 5, 4, 7, 6, 1, 2]));

// TODO Do the timSort Algorithm and its simplified version:
// NOTE Modern engines use TimSort, a stable hybrid of insertion sort and merge sort that exploits natural runs and provides O(n log n) in worst-case performance with O(n) which is linear on best-case on partially sorted data.

// this is NOT full TimSort -- just the structure.
const basicTimSort = (arr) => {
    const minRun = 32;
    const n = arr.length;

    // 1st. Sort small chunks using insertion sort:
    for (let i = 0; i < n; i += minRun) {
        insertionSort(arr, i, Math.min(i + minRun - 1, n - 1));
    }

    // 2nd. Merge chunks like merge sort:
    for (let size = minRun; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);

            if (mid < right) {
                mergeForTim(arr, left, mid, right);
            }
        }
    }
    return arr;
}

console.log(basicTimSort([10, 5, 11, 15, 13, 3]));

//! Need to define two functions which are the helper functions, for the main function of the timsort: inserstionSort and merge:

//* this is the seperate function which is a helper function for the main function of the basicTimSort:
function insertionSort(arr, left = 0, right = arr.length - 1) {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

//* this is also seperate function which is also helper function that feeds into the main function of the basicTimSort function:

// merge two sorted subarrays arr[left..mid] and arr[mid + 1...right] (inclusive):
function mergeForTim(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }

    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];

    return arr;
}

//! Radix Sort sorts numbers digit by digit, instead of comparing numbers directly. It does not compare elements. Thus this algorithm can be O(n) instead of O(n log n):
const radixSort = (arr) => {
    // arr.length === 0 → return arr immediately (already “sorted”):

    if (!arr.length) return arr;

    const max = Math.max(...arr);
    let exp = 1; // i.e. 1, 10, 100, 1000...

    while (Math.floor(max / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
    }
    return arr;
}

//* This is the helper function of countingSortByDigit function which feeds into the main function of the radixSort:
const countingSortByDigit = (arr, exp) => {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    // count digit occurances:
    for (let num of arr) {
        const digit = Math.floor(num / exp) % 10;
        count[digit]++;
    };

    // prefix Sum:
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // build output (iterate backwards for stability):
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    };

    // Copy back:
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i]
    }
}

console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]))