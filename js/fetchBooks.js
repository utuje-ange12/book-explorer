// Exercise 3.1: API module (fetch + async/await)
const BASE_URL = "https://openlibrary.org/search.json";
const FIELDS = "key,title,author_name,first_publish_year,cover_i";
const TIMEOUT_MS = 15000;

// Gives up if the server does not answer in time
async function fetchWithTimeout(url, ms = TIMEOUT_MS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        return await fetch(url, { signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

export async function fetchBooks(query, limit = 20) {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&limit=${limit}&fields=${FIELDS}`;
    let lastError;

    // Try twice before reporting a failure
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            const response = await fetchWithTimeout(url);
            if (!response.ok) throw new Error(`Request failed (${response.status})`);
            const data = await response.json();
            return data.docs.map(normalizeBook);
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
}

// Turn the API's shape into the small object the rest of the app uses
function normalizeBook(doc) {
    return {
        id: doc.key,
        title: doc.title,
        author: doc.author_name ? doc.author_name.slice(0, 2).join(", ") : "Unknown author",
        year: doc.first_publish_year ?? null,
        cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    };
}