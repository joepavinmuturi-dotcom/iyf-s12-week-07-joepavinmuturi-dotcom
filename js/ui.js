import { filterTodos, countRemaining } from "./todo-logic.js";

const list = document.getElementById("todo-list");
const counter = document.getElementById("todo-count");

export function render(state) {
    list.innerHTML = "";
    const visible = filterTodos(state.todos, state.filter);

    visible.forEach((todo) => {
        const item = document.createElement("li");
        item.dataset.id = todo.id;
        item.className = todo.completed ? "completed" : "";

        const label = document.createElement("span");
        label.textContent = todo.text;
        label.className = "todo-text";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        item.append(label, deleteButton);
        list.appendChild(item);
    });

    counter.textContent = `${countRemaining(state.todos)} items left`;
}
