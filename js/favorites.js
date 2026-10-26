// Exercises 2.2 and 2.4: favorites module saved in localStorage
const STORAGE_KEY = "bookExplorer.favorites";

export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return []; // storage unavailable or corrupted
    }
}

function save(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
    return getFavorites().some((book) => book.id === id);
}

export function addFavorite(book) {
    if (isFavorite(book.id)) return;
    save([...getFavorites(), book]);
}

export function removeFavorite(id) {
    save(getFavorites().filter((book) => book.id !== id));
}

export function toggleFavorite(book) {
    if (isFavorite(book.id)) {
        removeFavorite(book.id);
        return false;
    }
    addFavorite(book);
    return true;
}