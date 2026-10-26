import "./layout.js";
import { fetchBooks } from "./fetchBooks.js";
import { toggleFavorite } from "./favorites.js";
import { bookCard, onToggleClick, showLoading, showMessage, clearStatus } from "./ui.js";

const grid = document.getElementById("book-grid");
const status = document.getElementById("status");
const title = document.getElementById("results-title");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

let books = [];
let latestRequest = 0; // ignores slow, outdated responses

function render() {
    grid.innerHTML = books.map(bookCard).join("");
}

async function load(query, heading) {
    const requestId = ++latestRequest;
    title.textContent = heading;
    grid.innerHTML = "";
    showLoading(status);

    try {
        const result = await fetchBooks(query);
        if (requestId !== latestRequest) return; // a newer search has started

        books = result;
        if (books.length === 0) {
            showMessage(status, "No results found", `Nothing matched "${query}". Try a different title.`);
            return;
        }
        clearStatus(status);
        render();
    } catch (error) {
        if (requestId !== latestRequest) return;
        showMessage(status, "Couldn't load books", "Check your connection and try again.");
        console.error(error);
    }
}

// Exercise 3.3: search by title
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
        load("subject:fiction", "Popular picks");
        return;
    }
    load(query, `Results for "${query}"`);
});

onToggleClick(grid, () => books, (book) => {
    toggleFavorite(book);
    render();
});

// Issue #2: keep buttons in sync when favorites change in another tab
window.addEventListener("storage", (event) => {
    if (event.key === "bookExplorer.favorites") render();
});

// First load
load("subject:fiction", "Popular picks");