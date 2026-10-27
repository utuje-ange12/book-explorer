import { isFavorite } from "./favorites.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function bookCard(book) {
    const fav = isFavorite(book.id);
    const cover = book.cover
        ? `<img src="${esc(book.cover)}" alt="Cover of ${esc(book.title)}" loading="lazy" class="w-full h-64 object-cover bg-paper">`
        : `<div class="w-full h-64 bg-paper flex items-center justify-center text-ink/50 italic text-sm">No cover available</div>`;
    return `
    <article class="bg-page rounded-lg overflow-hidden shadow-md border border-brass/30 flex flex-col" data-id="${esc(book.id)}">
      ${cover}
      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-serif font-semibold text-lg leading-snug text-ink">${esc(book.title)}</h3>
        <p class="text-sm italic text-ink/70 mt-1">${esc(book.author)}${book.year ? ` · ${book.year}` : ""}</p>
        <button data-action="toggle" aria-pressed="${fav}"
          class="mt-4 rounded-lg px-4 py-2 text-sm font-semibold border focus:outline-none focus:ring-4 focus:ring-brass/50
          ${fav ? "bg-burgundy text-white border-burgundy hover:bg-burgundy-dark" : "bg-page text-burgundy border-burgundy hover:bg-paper"}">
          ${fav ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </article>`;
}

export function onToggleClick(grid, getBooks, callback) {
    grid.addEventListener("click", (event) => {
        const button = event.target.closest('[data-action="toggle"]');
        if (!button) return;
        const id = button.closest("[data-id]").dataset.id;
        const book = getBooks().find((b) => b.id === id);
        if (book) callback(book);
    });
}

export function showLoading(el) {
    el.innerHTML = `
    <div class="inline-block h-10 w-10 rounded-full border-4 border-brass/30 border-t-burgundy animate-spin" role="status">
      <span class="sr-only">Loading books</span>
    </div>`;
}

export function showMessage(el, title, detail = "") {
    el.innerHTML = `<p class="font-serif text-xl font-semibold text-ink">${esc(title)}</p>${detail ? `<p class="text-ink/70 italic mt-1">${esc(detail)}</p>` : ""}`;
}

export function clearStatus(el) {
    el.innerHTML = "";
}

export function showError(el, title, detail, onRetry) {
    showMessage(el, title, detail);
    const button = document.createElement("button");
    button.textContent = "Try again";
    button.className = "mt-4 rounded-lg bg-burgundy hover:bg-burgundy-dark text-white px-5 py-2 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-brass/50";
    button.addEventListener("click", onRetry);
    el.appendChild(button);
}