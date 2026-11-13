# Day 5: Code Review of My Weather Dashboard

> Edit this list so it matches what is really in your Weather Dashboard code. Keep only the items that apply.

## Improvements I would make

1. **Handle fetch errors.** Wrap `fetch` in `try/catch` and check `response.ok`, so a failed request shows a message instead of a blank screen.
2. **Show loading and empty states.** Display "Loading weather..." while waiting and "City not found" when the search fails.
3. **Move the API key and URLs into constants.** No magic strings inside functions.
4. **Use `const` and `let`, never `var`.** Prevents accidental reassignment.
5. **Use `===` instead of `==`.** Avoids hidden type conversion bugs.
6. **Split big functions.** One function fetches, one formats data, one updates the DOM.
7. **Cache DOM queries.** Call `getElementById` once at the top, not on every update.
8. **Use event delegation** for lists of cities or forecast days instead of one listener per item.
9. **Save the last searched city in `localStorage`.** The dashboard opens on the user's last city.
10. **Remove unused variables and old `console.log` lines.** Run ESLint to find them.
11. **Add comments only where the reason is not obvious.** Good names replace most comments.
12. **Run Prettier** so indentation and quotes are consistent.

## Priority order
1. Error handling (it affects users most)
2. Splitting large functions
3. Naming and constants
4. Formatting and cleanup
