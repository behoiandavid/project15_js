const input = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const API_KEY = 'bc772fd2';

let timeoutId;

input.addEventListener('input', () => {
    clearTimeout(timeoutId);
    const query = input.value.trim();

    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        return;
    }

    timeoutId = setTimeout(() => {
        searchMovies(query);
    }, 500);
});

async function searchMovies(query) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'False') {
            showError(data.Error);
        } else {
            showResults(data.Search);
        }
    } catch (error) {
        showError('An error occurred while fetching data.');
    }
}

function showResults(movies) {
    resultsContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie';
        movieEl.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year} | ${movie.Type}</p>
    `;
        resultsContainer.appendChild(movieEl);
    });
}

function showError(message) {
    resultsContainer.innerHTML = `<div class="error">${message}</div>`;
}