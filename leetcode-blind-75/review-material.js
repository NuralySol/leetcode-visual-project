//! Map global object review material:
// This is the quentesential example of the map frequency map: (works on iterables);
const map = new Map();
for (let c of 'banana') {
    map.set(c, (map.get(c) || 0) + 1);
};

//* Callback function example:
function greet(name, callback) {
    console.log("Hello " + name);
    callback();           // called later by greet
}

function sayBye() {
    console.log("Bye!");
}

console.log(greet("Nuraly", sayBye));

const numbers = [1, 2, 3, 4, 5, 6];
const k = 5;

const linearSearch = (arr, k) => {
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array of numbers');
    if (typeof (k) !== 'number' || !Number.isFinite(k)) throw new TypeError('k must be a finite interger number');
    const msg = 'Null;'

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i] === k) {
            return [{ value: arr[i], index: i }];
        }
    }
    // NOTE return must follow a control flow of the function: thus it cannot be within the control flow of the logic in the above case return will override the previous return of the function:
    // NOTE “A return statement exits the function immediately. If it’s inside a loop, the loop stops as well. To avoid premature exits, return failure values only after the loop finishes.” 
    return - 1;
};

const numberKtarget = linearSearch(numbers, k);

//! An alternative workaround Use a flag (less common, but educational)
const linearSearchV1 = (arr, target) => {
    let foundIndex = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            foundIndex = i;
            break;
        }
    }
    return foundIndex;
}

console.log(linearSearchV1([1, 2, 5, 6, 11, 123, 15], 11));

//! Binary search is a core searching algorithm, which divides the iterables in halves and then searches for the value if it exists inside the iterable:

const binarySearch = (arr, target) => {
    //* sort the array in place preserving i.e. Not mutating the array in place:
    arr = [...arr].sort((a, b) => a - b);

    // init the left and right pointers:
    let left = 0;
    let right = arr.length - 1;


    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return { message: `sorted binarySearch returns index: ${mid}, value: ${arr[mid]}` };
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // if the target not found: 
    return {
        message: `value${target} not found in array!`
    }
}

console.log(binarySearch([1, 6, 3, 2, 11, 15, 7], 15));

// NOTE What is the target value is a float and we wish to follow Math rules based on correct math operations and either round down and round up and then use the binary search function to find the value:

//* -- Helper function ROUNDING DECISION ONLY -- // 
const roundFromBounds = (arr, left, right, mode = 'floor') => {
    if (mode === 'floor') {
        return right >= 0 ? arr[right] : null;
    };
    if (mode === 'ceil') {
        return left < arr.length ? arr[left] : null;
    }
    throw new Error('mode must be a `floor` or `ceil`');
};

//* -- End of the Helper function --// 

//^ Modifed BinarySearch function which takes into account rounding down or rounding up: also this return a boolean if the target is a true int or a rounded float its neared 'round value':
const binarySearchRounded = (arr, target, mode = 'floor') => {
    // defensive copy and sort on an array:
    arr = [...arr].sort((a, b) => a - b);

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return {
                value: arr[mid],
                index: mid,
                exact: true
            };
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // fallback return target not found -> delegate rounding logic:
    return {
        value: roundFromBounds(arr, left, right, mode),
        exact: false,
        rounded: mode
    };
}


console.log(binarySearchRounded(
    [1, 6, 3, 2, 11, 15, 7, 18],
    12.5,
    "floor"
));

