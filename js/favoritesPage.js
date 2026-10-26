import "./layout.js";
import { getFavorites, removeFavorite } from "./favorites.js";
import { bookCard, showMessage, clearStatus, onToggleClick } from "./ui.js";

const grid = document.getElementById("book-grid");
const status = document.getElementById("status");
const count = document.getElementById("fav-count");

function render() {
    const favorites = getFavorites();
    count.textContent = `${favorites.length} saved ${favorites.length === 1 ? "book" : "books"}`;

    if (favorites.length === 0) {
        grid.innerHTML = "";
        showMessage(status, "No favorites yet", "Add a book on the Home page and it will show up here.");
        return;
    }
    clearStatus(status);
    grid.innerHTML = favorites.map(bookCard).join("");
}

onToggleClick(grid, getFavorites, (book) => {
    removeFavorite(book.id);
    render();
});

// Issue #2: update the list when favorites change in another tab
window.addEventListener("storage", (event) => {
    if (event.key === "bookExplorer.favorites") render();
});

render();