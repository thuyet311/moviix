import "./App.css";
import MovieList from "./components/MovieList";
import requests from "./request";
import Banner from "./components/Banner";

function App() {
  return (
    <div className="App">
      <Banner />
      <MovieList rowTitle="Trending Now" url={requests.fetchTrending} />
      <MovieList rowTitle="Top Rated" url={requests.fetchToprated} />
    </div>
  );
}

export default App;
