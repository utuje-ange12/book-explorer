# Book Explorer

A responsive web app for finding books and saving favorites. Built with HTML, Tailwind CSS and vanilla JavaScript (ES modules), using the Open Library API.

## Features
- Browse books fetched from Open Library
- Search by title, with loading and "no results" states
- Add and remove favorites, saved in localStorage
- Home, Favorites and About pages, responsive from mobile to desktop

## Run it
ES modules need a local server (opening the file directly will not work).


- IntelliJ: open `index.html` and click the browser icon in the editor corner

## Project structure
- `js/fetchBooks.js`: API module (fetch + async/await)
- `js/favorites.js`: add, remove, toggle, localStorage
- `js/ui.js`: book cards and loading, empty and error states
- `js/layout.js`: shared navbar and footer
- `js/home.js`, `js/favoritesPage.js`: page logic