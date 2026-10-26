import { isFavorite } from "./favorites.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function bookCard(book) {
    const fav = isFavorite(book.id);
    const cover = book.cover
        ? `<img src="${esc(book.cover)}" alt="Cover of ${esc(book.title)}" loading="lazy" class="w-full h-64 object-cover bg-slate-200">`
        : `<div class="w-full h-64 bg-slate-200 flex items-center justify-center text-slate-500 text-sm">No cover available</div>`;
    return `
    <article class="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 flex flex-col" data-id="${esc(book.id)}">
      ${cover}
      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-serif font-semibold text-lg leading-snug">${esc(book.title)}</h3>
        <p class="text-sm text-slate-600 mt-1">${esc(book.author)}${book.year ? ` · ${book.year}` : ""}</p>
        <button data-action="toggle" aria-pressed="${fav}"
          class="mt-4 rounded-lg px-4 py-2 text-sm font-semibold border focus:outline-none focus:ring-4 focus:ring-teal-700/30
          ${fav ? "bg-teal-700 text-white border-teal-700 hover:bg-teal-800" : "bg-white text-teal-700 border-teal-700 hover:bg-slate-100"}">
          ${fav ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </article>`;
}

// Exercise 2.3: one click listener on the grid handles every card's button
export function onToggleClick(grid, getBooks, callback) {
    grid.addEventListener("click", (event) => {
        const button = event.target.closest('[data-action="toggle"]');
        if (!button) return;
        const id = button.closest("[data-id]").dataset.id;
        const book = getBooks().find((b) => b.id === id);
        if (book) callback(book);
    });
}

// Exercise 3.4: loading, empty and error states
export function showLoading(el) {
    el.innerHTML = `
    <div class="inline-block h-10 w-10 rounded-full border-4 border-slate-300 border-t-teal-700 animate-spin" role="status">
      <span class="sr-only">Loading books</span>
    </div>`;
}

export function showMessage(el, title, detail = "") {
    el.innerHTML = `<p class="font-serif text-xl font-semibold">${esc(title)}</p>${detail ? `<p class="text-slate-600 mt-1">${esc(detail)}</p>` : ""}`;
}

export function clearStatus(el) {
    el.innerHTML = "";
}