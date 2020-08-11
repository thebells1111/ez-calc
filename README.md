# ez-calc

A super simple calculator function used to complete the freeCodeCamp Calculator project.
The `calc` function takes four arguements... and `input` string, a `totalArr` array (optional), a `total` string (optional),
and a `clearSet` boolean (optional).

The `input` value can be a number,`-`, `+`, `/`, `*`, `x`, `.`, `=`, `ac` (for All Clear\_, `c` or `clear` (for clear,
which removes the last input. If clear is pressed twice, it's equavalent to All Clear)

To use

```js
import calc from "ez-calc";

let input = 2;
let totalArr = [2, "+", 2, "+"];
let total = 4;
let clearSet = false;

const calculator = calc(input, totalArr, total, clearSet);
totalArr = calculator[0];
total = calculator[1];
clearSet = calculator[2];
```
