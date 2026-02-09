//! This is a blind 75 for the string argument inputs for the leetcode 75 problems:


/* ============================================================
 * 1. ANAGRAMS / FREQUENCY COUNTING
 * ============================================================
 */

/*
 * LC 242 — Valid Anagram
 * Given two strings s and t, return true if t is an anagram of s.
 */
// NOTE anagrams are same letter even if re-arranged: i.e. -> blue, lube :)!
// NOTE make sure to practice how to make frequency counts using Map and/ Set global object:
const isAnagram = (s, t) => {
    if (s.length !== t.length) {
        return false;
    }

    // create a frequency hash map:
    let freq = new Map();

    // this loop will count the characters in s:
    for (let char of s) {
        freq[char] = (freq[char] || 0) + 1;
    };

    // subtract using characters in t:
    for (let char of t) {
        //* if char not found or count goes negative -> not an anagram:
        if (!freq[char]) {
            return false;
        };
        freq[char]--;
    }
    return true;
};

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false


/*
 * LC 49 — Group Anagrams
 * Group strings that are anagrams of each other.
 */
const groupAnagrams = (strs) => {
    let groups = new Map();

    for (let word of strs) {
        // sort chars joined as a string:
        const key = word.split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(word);
    }
    return Array.from(groups.values());
}

//* NOTE There is a faster algorithm called  “LC 49 count-key version”. 
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [
//   ["eat","tea","ate"],
//   ["tan","nat"],
//   ["bat"]
// ]


/* ============================================================
 * 2. PALINDROMES
 * ============================================================
 */

/*
 * LC 125 — Valid Palindrome
 * Ignore non-alphanumeric characters and case.
 */

//^ Palindrome is a string that reads backwards the same as the forwards: i.e. nun:

//* A Helper function called isAlphaNum => for the isPalindrome main function:
// this function returns boolean on where the char is at AlphaNumerical slide: 
const isAlphaNum = (ch) => {
    const code = ch.charCodeAt(0);
    // 0 - 9:
    if (code >= 48 && code <= 57) return true;
    // A - Z:
    if (code >= 65 && code <= 90) return true;
    // a - z:
    if (code >= 97 && code <= 122) return true;

    //* need to run false explicitly:
    return false;

}
//* -- END of Helper function -- // 

// two-pointer technique, with no extra strings:
const isPalindrome = (str) => {
    // two pointer concept in dealing with left and right pointers:
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        while (left < right && !isAlphaNum(str[left])) left++;
        while (left < right && !isAlphaNum(str[right])) right--;

        if (str[left].toLowerCase() !== str[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false


/*
 * LC 5 — Longest Palindromic Substring
 */

const longestPalindrome = (s) => {
    //* strict validation of the s string argh:
    if (typeof (s) !== 'string') throw new TypeError('s must be a string object');
    if (s.length === 0) return '';

    let bestStart = 0;
    let bestLen = 1;

    // nested function: which is a helper function!
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        // palindrome is from l + 1, to r - 1:
        const start = l + 1;
        const len = r - l - 1;
        return [start, len];
    };

    for (let i = 0; i < s.length; i++) {
        const [s1, len1] = expand(i, i); // odd:
        const [s2, len2] = expand(i, i + 1) // even:

        if (len1 > bestLen) {
            bestStart = s1;
            bestLen = len1;
        }
        if (len2 > bestLen) {
            bestStart = s2;
            bestLen = len2;
        }
    }
    return s.slice(bestStart, bestStart + bestLen);
}

console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // "bb"

// TODO do the below examples of strings:
/* ============================================================
 * 3. SLIDING WINDOW (STRINGS)
 * ============================================================
 */

/*
 * LC 3 — Longest Substring Without Repeating Characters
 */
const lengthOfLongestSubstring = (str) => {
    if (typeof (str) !== 'string') throw new TypeError('str argh must be a string object');
    if (str.length < 1) throw new RangeError('string must not be empty');
    
    let seen = new Map();
    let left = 0;
    let best = 0;

    // sliding window dynamic view of the values within the string:
    for (let right = 0; right < str.length; right++) {
        let ch = str[right]; 

        if (seen.has(ch) && seen.get(ch) >= left) {
            left = seen.get(ch) + 1;
        }
        seen.set(ch, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}

// NOTE there is an option of also returning the values as well:
console.log(lengthOfLongestSubstring("abcabcbb")); // 3

/*
 * LC 424 — Longest Repeating Character Replacement
 */
const characterReplacement = (str, k) => {
    //* validation of the array arghs:
    if (typeof (str) !== 'string') throw new TypeError('str must be a string');
    if (typeof (k) !== 'number' || !Number.isFinite(k) || k < 0) {
        throw new TypeError('k must be a non-negatice finite number');
    };

    // init the default values with the Map() global object:
    const count = new Map();
    let left = 0;
    let maxFreq = 0;
    let best = 0;

    for (let right = 0; right < str.length; right++) {
        const ch = str[right];
        count.set(ch, (count.get(ch) || 0) + 1);

        maxFreq = Math.max(maxFreq, count.get(ch));

        while ((right - left + 1) - maxFreq > k) {
            const leftChar = str[left];
            count.set(leftChar, count.get(leftChar) - 1);
            left++;
        }

        best = Math.max(best, right - left + 1);
    }
    return best;
}

console.log(characterReplacement("AABABBA", 1));   // 4


/*
 * LC 76 — Minimum Window Substring
 */
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));               // "a"
console.log(minWindow("a", "aa"));              // ""


/* ============================================================
 * 4. SUBSTRING / PARSING
 * ============================================================
 */

/*
 * LC 28 — Implement strStr()
 * Find the first index of needle in haystack.
 */
console.log(strStr("hello", "ll")); // 2
console.log(strStr("aaaaa", "bba"));// -1


/*
 * LC 20 — Valid Parentheses
 */
console.log(isValid("()"));        // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));      // false


/* ============================================================
 * 5. STRING MAPPING / TRANSFORMATION
 * ============================================================
 */

/*
 * LC 205 — Isomorphic Strings
 */
console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false


/*
 * LC 290 — Word Pattern
 */
console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish"));// false


/* ============================================================
 * 6. ENCODING / DECODING
 * ============================================================
 */

/*
 * LC 271 — Encode and Decode Strings
 */
const encoded = encode(["lint","code","love","you"]);
console.log(encoded);
console.log(decode(encoded)); // ["lint","code","love","you"]


/* ============================================================
 * 7. EDGE-CASE STRING LOGIC
 * ============================================================
 */

/*
 * LC 14 — Longest Common Prefix
 */
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""


/***********************************************************************
 * If you can implement all of the above from scratch,
 * you are complete on the Blind 75 string section.
 ***********************************************************************/