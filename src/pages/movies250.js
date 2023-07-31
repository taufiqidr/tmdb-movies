import React from "react";
import MoviesList from "../components/MoviesList";

const Movies250 = () => {
  return (
    <MoviesList
      title="Top 250 Movies"
      endpoint="https://api.themoviedb.org/3/movie/top_rated"
    />
  );
};

export default Movies250;
