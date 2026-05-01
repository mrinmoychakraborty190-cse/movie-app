const apiKey = "55d2305e";
const baseUrl = "https://api.themoviedb.org/3";

// Fetch Trending
fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    showMovies(data.results, "trending");
    setBanner(data.results[0]);
  });

// Fetch Action Movies
fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`)
  .then(res => res.json())
  .then(data => showMovies(data.results, "action"));

// Fetch Comedy Movies
fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`)
  .then(res => res.json())
  .then(data => showMovies(data.results, "comedy"));

// Show Movies
function showMovies(movies, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
    `;

    container.appendChild(div);
  });
}

// Banner
function setBanner(movie) {
  document.getElementById("banner").style.backgroundImage =
    `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
}

// Search
document.getElementById("searchInput").addEventListener("keyup", e => {
  if (e.key === "Enter") {
    searchMovies(e.target.value);
  }
});

function searchMovies(query) {
  fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => showMovies(data.results, "trending"));
}
