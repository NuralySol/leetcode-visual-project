
import * as dfd from "danfojs-node";

const df = new dfd.DataFrame({
    name: ["Alice", "Bob", "Carol"],
    age: [30, 25, 35],
    score: [90, 85, 95]
});

df.print()