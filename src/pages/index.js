import React from "react";
import MoviesList from "../components/MoviesList";

const Popularmovies = () => {
  return (
    <MoviesList
      title="Most Popular Movies"
      endpoint="https://api.themoviedb.org/3/movie/popular"
    />
  );
};

export default Popularmovies;
