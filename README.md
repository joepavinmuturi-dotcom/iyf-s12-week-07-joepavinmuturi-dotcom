# iyf-s12-week-07-joepavinmuturi-dotcom

# Week 7: JavaScript Best Practices - To-Do List Refactor

## Author
- **Name:** Joepavin Muturi
- **GitHub:** [@joepavinmuturi-dotcom](https://github.com/joepavinmuturi-dotcom)
- **Date:** November 13, 2026

## Project Description
My Week 5 To-Do List, refactored for Week 7. It now saves data with localStorage, is split into ES modules, passes ESLint, and has unit tests for its logic. It also includes a Shopping Cart class build and the daily challenges.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES modules)
- localStorage
- ESLint
- Prettier
- Vitest

## Features
- Todos, completed state and the selected filter persist across page refreshes
- Code split into `state.js`, `storage.js`, `todo-logic.js`, `ui.js` and `app.js`
- Pure logic functions with unit tests
- Safe storage loading that falls back to defaults on bad data
- Shopping cart with quantity changes, total, item count and clear option

## How to Run
1. Clone this repository
2. Run `npm install`
3. Open `index.html` with Live Server (modules need a server)
4. Run `npm test` for tests and `npm run lint` for linting

## Lessons Learned
- localStorage only stores strings, so data must be converted with JSON.stringify and JSON.parse.
- Keeping logic in pure functions makes it easy to test without a browser.
- Splitting code into modules makes each file have one job.
- Load from storage once at startup and save after every change.

## Challenges Faced
- Modules failed to load until I used `type="module"` and Live Server.
- `dataset.id` is a string, so I converted it with `Number()` before comparing ids.
- ESLint 9 needs `eslint.config.js` instead of the old `.eslintrc.json`.
- I kept `node_modules/` out of Git with `.gitignore` before running `npm install`.

