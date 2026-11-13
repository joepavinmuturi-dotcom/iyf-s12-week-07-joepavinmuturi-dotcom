const DRAFT_KEY = "contactDraft";
const SAVE_INTERVAL_MS = 5000;

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

function readForm() {
    return Object.fromEntries(new FormData(form).entries());
}

function saveDraft() {
    const data = readForm();
    const hasContent = Object.values(data).some((value) => value.trim() !== "");
    if (!hasContent) {
        return;
    }
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        status.textContent = `Draft saved at ${new Date().toLocaleTimeString()}.`;
    } catch {
        status.textContent = "Could not save your draft in this browser.";
    }
}

function restoreDraft() {
    try {
        const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
        if (!draft) {
            return;
        }
        Object.entries(draft).forEach(([name, value]) => {
            if (form.elements[name]) {
                form.elements[name].value = value;
            }
        });
        status.textContent = "Your saved draft was restored.";
    } catch {
        localStorage.removeItem(DRAFT_KEY);
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        // Nothing to clear if storage is blocked.
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearDraft();
    form.reset();
    status.textContent = "Message sent. Your draft was cleared.";
});

restoreDraft();
setInterval(saveDraft, SAVE_INTERVAL_MS);
