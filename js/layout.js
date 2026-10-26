
const links = [
    { href: "index.html", label: "Home" },
    { href: "favorites.html", label: "Favorites" },
    { href: "about.html", label: "About" },
];

const current = location.pathname.split("/").pop() || "index.html";

document.getElementById("site-nav").innerHTML = `
  <nav class="bg-white border-b border-slate-200" aria-label="Main">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="font-serif text-xl font-bold text-slate-900">Book Explorer</a>
      <ul class="flex gap-1 sm:gap-4 text-sm font-medium">
        ${links.map((l) => `
          <li>
            <a href="${l.href}"
               class="px-3 py-2 rounded-md hover:bg-slate-100 ${l.href === current ? "text-teal-700 font-semibold" : "text-slate-700"}"
               ${l.href === current ? 'aria-current="page"' : ""}>${l.label}</a>
          </li>`).join("")}
      </ul>
    </div>
  </nav>`;

document.getElementById("site-footer").innerHTML = `
  <div class="bg-white border-t border-slate-200 mt-10">
    <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col sm:flex-row gap-2 justify-between">
      <p>Book Explorer · Frontend Phase 1 capstone</p>
      <p>Data from <a class="underline" href="https://openlibrary.org" target="_blank" rel="noopener">Open Library</a></p>
    </div>
  </div>`;