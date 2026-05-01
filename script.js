const apiKey = "55d2305e";

async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) return alert("Enter a movie name");

  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await res.json();

  displayMovies(data.Search);
}

function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  if (!movies) {
    container.innerHTML = "<h2>No results found</h2>";
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    container.appendChild(movieCard);
  });
}
