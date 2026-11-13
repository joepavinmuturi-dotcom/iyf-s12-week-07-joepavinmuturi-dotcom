import { state, subscribe, add, toggle, remove, setFilter } from "./state.js";
import { render } from "./ui.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll("[data-filter]");

subscribe(() => render(state));

form.addEventListener("submit", (event) => {
    event.preventDefault();
    add(input.value);
    input.value = "";
});

list.addEventListener("click", (event) => {
    const item = event.target.closest("li");
    if (!item) {
        return;
    }
    const id = Number(item.dataset.id);
    if (event.target.classList.contains("delete-btn")) {
        remove(id);
    } else {
        toggle(id);
    }
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
});

render(state);