// Navbar and footer shared by every page (book theme)
const links = [
    { href: "index.html", label: "Home" },
    { href: "favorites.html", label: "Favorites" },
    { href: "about.html", label: "About" },
];

const current = location.pathname.split("/").pop() || "index.html";

document.getElementById("site-nav").innerHTML = `
  <nav class="bg-page border-b border-brass/40" aria-label="Main">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="font-serif text-xl font-bold text-leather">Book Explorer</a>
      <ul class="flex gap-1 sm:gap-4 text-sm font-medium">
        ${links.map((l) => `
          <li>
            <a href="${l.href}"
               class="px-3 py-2 rounded-md hover:bg-paper ${l.href === current ? "text-burgundy font-semibold underline decoration-brass decoration-2 underline-offset-8" : "text-ink/80"}"
               ${l.href === current ? 'aria-current="page"' : ""}>${l.label}</a>
          </li>`).join("")}
      </ul>
    </div>
  </nav>`;

document.getElementById("site-footer").innerHTML = `
  <div class="bg-leather text-paper/80 mt-10 border-t-4 border-brass">
    <div class="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col sm:flex-row gap-2 justify-between">
      <p>Book Explorer · Frontend Phase 1 capstone</p>
      <p>Data from <a class="underline hover:text-white" href="https://openlibrary.org" target="_blank" rel="noopener">Open Library</a></p>
    </div>
  </div>`;