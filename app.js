const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];            
let currentFilter = "all"; 
let nextId = 1;
let editingId = null;    



function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark "${todo.text}" as completed`);
    li.appendChild(checkbox);

    if (todo.id === editingId) {
       
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", "Edit task");
        li.appendChild(editInput);
    } else {
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text; 
        li.appendChild(span);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", `Delete "${todo.text}"`);
    li.appendChild(deleteBtn);

    return li;
}

function visibleTodos() {
    if (currentFilter === "active") return todos.filter((t) => !t.completed);
    if (currentFilter === "completed") return todos.filter((t) => t.completed);
    return todos;
}

function render() {
    todoList.replaceChildren(...visibleTodos().map(createTodoElement));

   
    const editInput = todoList.querySelector(".edit");
    if (editInput) {
        editInput.focus();
        const end = editInput.value.length;
        editInput.setSelectionRange(end, end);
    }

    updateStats();
}

function updateStats() {
    const count = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${count} ${count === 1 ? "item" : "items"} left`;
}




function addTodo(text) {
    todos.push({ id: nextId++, text, completed: false });
    render();
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const text = input.value.trim();

    if (text === "") {
        formError.textContent = "Type a task first.";
        return;
    }

    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});




function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
    render();
}

function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    render();
}

todoList.addEventListener("click", (event) => {
    if (event.target.closest(".edit")) return;

    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id); 

    if (event.target.closest(".delete")) { 
        deleteTodo(id);
        return;
    }

    toggleTodo(id);
});



function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach((btn) => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });
    render();
}

filters.forEach((btn) => {
    btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);




function startEditing(id) {
    editingId = id;
    render();
}

function saveEdit(id, newText) {
    const text = newText.trim();
    const todo = todos.find((t) => t.id === id);
    if (todo && text !== "") todo.text = text; 
    editingId = null;
    render();
}

function cancelEdit() {
    editingId = null;
    render();
}

todoList.addEventListener("dblclick", (event) => {
    if (!event.target.classList.contains("todo-text")) return;
    const item = event.target.closest(".todo-item");
    if (!item) return;
    startEditing(Number(item.dataset.id));
});

todoList.addEventListener("keydown", (event) => {
    if (!event.target.classList.contains("edit")) return;
    const id = Number(event.target.closest(".todo-item").dataset.id);

    if (event.key === "Enter") {
        saveEdit(id, event.target.value);
    } else if (event.key === "Escape") {
        cancelEdit();
    }
});


todoList.addEventListener("focusout", (event) => {
    if (!event.target.classList.contains("edit")) return;
    if (editingId === null) return; // already saved or cancelled
    const id = Number(event.target.closest(".todo-item")?.dataset.id);
    if (id === editingId) saveEdit(id, event.target.value);
});



render();