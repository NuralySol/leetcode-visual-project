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