const THEME_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";

const toggleButton = document.getElementById("theme-toggle");

function getSavedTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        return saved === DARK ? DARK : LIGHT;
    } catch {
        return LIGHT;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch {
        // Storage can be blocked (private mode). The theme still works for this visit.
    }
}

function applyTheme(theme) {
    const isDark = theme === DARK;
    document.body.classList.toggle("dark", isDark);
    toggleButton.setAttribute("aria-pressed", String(isDark));
    toggleButton.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
}

toggleButton.addEventListener("click", () => {
    const next = document.body.classList.contains("dark") ? LIGHT : DARK;
    applyTheme(next);
    saveTheme(next);
});

applyTheme(getSavedTheme());
