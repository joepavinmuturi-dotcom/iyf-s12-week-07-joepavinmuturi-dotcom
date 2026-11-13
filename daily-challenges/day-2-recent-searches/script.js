const HISTORY_KEY = "recentSearches";
const MAX_ITEMS = 5;

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const datalist = document.getElementById("recent-list");
const historyList = document.getElementById("history");
const status = document.getElementById("status");
const clearButton = document.getElementById("clear-history");

function loadHistory() {
    try {
        const data = JSON.parse(localStorage.getItem(HISTORY_KEY));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
        status.textContent = "Could not save your history in this browser.";
    }
}

export function addSearch(history, term) {
    const cleaned = term.trim();
    if (cleaned === "") {
        return history;
    }
    const withoutDuplicate = history.filter(
        (item) => item.toLowerCase() !== cleaned.toLowerCase()
    );
    return [cleaned, ...withoutDuplicate].slice(0, MAX_ITEMS);
}

function render(history) {
    datalist.innerHTML = "";
    historyList.innerHTML = "";

    if (history.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No searches yet. Try one above.";
        historyList.appendChild(empty);
        return;
    }

    history.forEach((term) => {
        const option = document.createElement("option");
        option.value = term;
        datalist.appendChild(option);

        const item = document.createElement("li");
        item.textContent = term;
        historyList.appendChild(item);
    });
}

let history = loadHistory();

form.addEventListener("submit", (event) => {
    event.preventDefault();
    history = addSearch(history, input.value);
    saveHistory(history);
    status.textContent = `Searched for "${input.value.trim()}".`;
    input.value = "";
    render(history);
});

clearButton.addEventListener("click", () => {
    history = [];
    saveHistory(history);
    status.textContent = "History cleared.";
    render(history);
});

render(history);
