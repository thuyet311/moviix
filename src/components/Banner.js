import React, { useState, useEffect } from "react";
import requests from "../request";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(requests.fetchTrending);
      const data = await request.json();

      // random movies for banner
      Math.floor(Math.random() * data.results.length - 1);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    }
    fetchData();
  }, []); //--> run once

  // console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`, //--> ? handles a null value
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie.title || movie.name}</h1>
        <div className="banner-buttons">
          <button>Play</button>
          <button>My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="faded-banner"></div>
    </header>
  );
};
export default Banner;
