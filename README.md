# Book Explorer

A responsive web app for finding books and saving favorites. Built with HTML, Tailwind CSS and vanilla JavaScript (ES modules), using the Open Library API.

## Features
- Browse books fetched from Open Library
- Search by title, with loading, "no results" and error states (with a Try again button)
- Add and remove favorites, saved in localStorage and synced across browser tabs
- Home, Favorites and About pages, responsive from mobile to desktop

## Run it
ES modules need a local server (opening the file directly will not work).

- IntelliJ: open `index.html` and click the browser icon in the editor corner

## Project structure
```
book-explorer/
├── index.html          Home page: hero, search bar, book grid
├── favorites.html      Favorites page
├── about.html          About page
├── README.md
└── js/
    ├── theme.js          Tailwind colors and fonts (book theme)
    ├── layout.js         Shared navbar and footer
    ├── fetchBooks.js     API module (fetch + async/await, timeout and retry)
    ├── favorites.js      Add, remove, toggle, localStorage
    ├── ui.js             Book cards, loading, empty and error states
    ├── home.js           Home page logic: load, search, favorite
    └── favoritesPage.js  Favorites page logic
```

## Workflow
Built with GitHub Issues, a Projects board, feature branches and pull requests.