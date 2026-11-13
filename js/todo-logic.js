export function addTodo(todos, text) {
    const trimmed = text.trim();
    if (trimmed === "") {
        return todos;
    }
    return [
        ...todos,
        { id: Date.now(), text: trimmed, completed: false, createdAt: new Date().toISOString() },
    ];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

export function countRemaining(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
