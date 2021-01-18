import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./MovieList.css";
import movieTrailer from "movie-trailer";

const imageUrl = "https://image.tmdb.org/t/p/original/";
const MovieList = ({ rowTitle, url }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(url);
      const data = await request.json();

      // console.log(data);
      setMovies(data.results);
    }
    fetchData();
  }, [url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    movieTrailer(movie.title)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v")); //get() method of URLSearchParams returns the first value associated to the given search parameter
        // console.log(trailerUrl);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      <h2>{rowTitle}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${imageUrl}${movie.poster_path}`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      <YouTube className="" videoId={trailerUrl} opts={opts} />
    </div>
  );
};
export default MovieList;
