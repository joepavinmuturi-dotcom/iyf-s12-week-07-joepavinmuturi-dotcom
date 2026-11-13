import { describe, it, expect } from "vitest";
import { addTodo, toggleTodo, deleteTodo, filterTodos, countRemaining } from "../js/todo-logic.js";

const sample = [
    { id: 1, text: "Study", completed: false },
    { id: 2, text: "Cook", completed: true },
];

describe("addTodo", () => {
    it("adds a new todo", () => {
        const result = addTodo([], "Read");
        expect(result).toHaveLength(1);
        expect(result[0].text).toBe("Read");
        expect(result[0].completed).toBe(false);
    });
    it("ignores empty text", () => {
        expect(addTodo(sample, "   ")).toEqual(sample);
    });
    it("does not change the original array", () => {
        const original = [...sample];
        addTodo(sample, "New");
        expect(sample).toEqual(original);
    });
});

describe("toggleTodo", () => {
    it("flips the completed state", () => {
        expect(toggleTodo(sample, 1)[0].completed).toBe(true);
    });
    it("handles an id that does not exist", () => {
        expect(toggleTodo(sample, 99)).toEqual(sample);
    });
});

describe("deleteTodo", () => {
    it("removes the todo with that id", () => {
        expect(deleteTodo(sample, 1)).toHaveLength(1);
    });
});

describe("filterTodos", () => {
    it("returns only active todos", () => {
        expect(filterTodos(sample, "active")).toHaveLength(1);
    });
    it("returns only completed todos", () => {
        expect(filterTodos(sample, "completed")[0].id).toBe(2);
    });
    it("handles an empty list", () => {
        expect(filterTodos([], "all")).toEqual([]);
    });
});

describe("countRemaining", () => {
    it("counts uncompleted todos", () => {
        expect(countRemaining(sample)).toBe(1);
    });
});
