# 🚀 Advanced JavaScript & Algorithm Mastery Roadmap

> A structured progression beyond fundamentals into deep algorithmic thinking, JavaScript internals, system design, and performance engineering.

---

## 📚 Overview

This roadmap covers advanced topics for engineers who already understand:

- Sliding Window
- Two Pointers
- Dynamic Programming (basics)
- Sorting Algorithms
- Recursion
- Maps & Sets
- Closures

The following sections represent the next level.

---

# 🧠 1. JavaScript Execution Model & Internals

### 🔹 Call Stack & Execution Context

- Execution context creation
- Stack frames
- Scope chain resolution

### 🔹 Heap vs Stack Memory

- Primitive vs reference storage
- Object references
- Memory allocation

### 🔹 Event Loop

- Microtasks vs macrotasks
- Promise queue
- `setTimeout` behavior
- Execution ordering

Example:

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
