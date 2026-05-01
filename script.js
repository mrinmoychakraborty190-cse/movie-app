const apiKey = "7e9a51bc";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const bannerUrl = "https://image.tmdb.org/t/p/original";

// 🔥 Trending Movies
fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    console.log("Trending Data:", data); // ✅ Debug added
    if (data.results) {
      showMovies(data.results, "trending");
      setBanner(data.results[0]);
    } else {
      console.error("No trending data found");
    }
  })
  .catch(err => console.error("Error fetching trending:", err));

// 🎭 Action Movies
fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`)
  .then(res => res.json())
  .then(data => {
    console.log("Action Data:", data); // ✅ Debug
    showMovies(data.results, "action");
  })
  .catch(err => console.error("Error fetching action:", err));

// 😂 Comedy Movies
fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`)
  .then(res => res.json())
  .then(data => {
    console.log("Comedy Data:", data); // ✅ Debug
    showMovies(data.results, "comedy");
  })
  .catch(err => console.error("Error fetching comedy:", err));

// 🎬 Show Movies
function showMovies(movies, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  if (!movies) {
    container.innerHTML = "<h3>No movies found</h3>";
    return;
  }

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="${movie.poster_path ? imgUrl + movie.poster_path : 'https://via.placeholder.com/150'}" />
    `;

    container.appendChild(div);
  });
}

// 🎥 Banner
function setBanner(movie) {
  if (!movie || !movie.backdrop_path) return;

  document.getElementById("banner").style.backgroundImage =
    `url(${bannerUrl + movie.backdrop_path})`;
}

// 🔍 Search Movies
document.getElementById("searchInput").addEventListener("keyup", e => {
  if (e.key === "Enter") {
    searchMovies(e.target.value);
  }
});

function searchMovies(query) {
  if (!query) return;

  fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      console.log("Search Data:", data); // ✅ Debug
      showMovies(data.results, "trending");
    })
    .catch(err => console.error("Error searching movies:", err));
}
