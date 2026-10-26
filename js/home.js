import "./layout.js";
import { fetchBooks } from "./fetchBooks.js";
import { toggleFavorite } from "./favorites.js";
import { bookCard, onToggleClick, showMessage, clearStatus } from "./ui.js";

const grid = document.getElementById("book-grid");
const status = document.getElementById("status");

let books = [];

function render() {
    grid.innerHTML = books.map(bookCard).join("");
}

async function load(query) {
    grid.innerHTML = "";
    showMessage(status, "Loading books…"); // a proper spinner comes in section 7
    try {
        books = await fetchBooks(query);
        if (books.length === 0) {
            showMessage(status, "No results found", "Try a different search.");
            return;
        }
        clearStatus(status);
        render();
    } catch (error) {
        showMessage(status, "Couldn't load books", "Check your connection and try again.");
        console.error(error);
    }
}

// Clicking a favorite button toggles it, then redraws the cards
onToggleClick(grid, () => books, (book) => {
    toggleFavorite(book);
    render();
});

// Exercise 3.2: fill the homepage from the API
load("subject:fiction");