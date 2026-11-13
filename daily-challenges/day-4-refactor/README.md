# Day 4: Refactor

## What I changed
1. Replaced `var` with `const` so values cannot be reassigned by accident.
2. Gave functions and variables meaningful names (`f` became `addItem`, `d` became `items`).
3. Replaced the magic numbers `1.16`, `0` and `100` with named constants.
4. Flattened three levels of nested `if` into one validation function.
5. Used `!==` and `reduce` instead of `!=` and a manual loop.
6. Replaced `console.log("bad")` with a thrown error that says what went wrong.
7. Split one job into small functions: validate, add VAT, add item, total.

## Why it matters
The new version can be read in seconds, tested on its own, and changed without breaking other parts.
