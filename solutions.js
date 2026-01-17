// Put YOUR solutions here. Key must match problem.id in data.js

window.SOLUTIONS = {
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

    "contains-duplicate": {
        fn: null,
        code: "// TODO: implement containsDuplicate (LC 217)"
    }
};
