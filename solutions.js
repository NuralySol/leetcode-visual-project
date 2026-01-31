// Put YOUR solutions here. Key must match problem.id in data.js

window.SOLUTIONS = {
    // This is the solution for the get TwoSum function:
    "two-sum": {
        fn: (arr, k) => {
            const seen = new Map();
            for (let i = 0; i < arr.length; i++) {
                const c = k - arr[i];
                if (seen.has(c)) return [seen.get(c), i];
                seen.set(arr[i], i);
            }
            return [];
        },
        code: `
const twoSum = (arr, k) => {
    const seen = new Map();
    for (let i = 0; i < arr.length; i++) {
        const c = k - arr[i];
        if (seen.has(c)) return [seen.get(c), i];
        seen.set(arr[i], i);
    }
    return [];
};
`
    },
    // NOTE function is being passed in as an object and tied to the data:
    // { input: [[1, 2, 3, 1]], expected: true },
    "contains-duplicate": {
        fn: (arr, k) => {
            const set = new Set(); 
        },
        code: "// TODO: implement containsDuplicate (LC 217)"
    }
};
