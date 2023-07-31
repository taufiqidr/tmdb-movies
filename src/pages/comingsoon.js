import React from "react";
import MoviesList from "../components/MoviesList";

const Comingsoon = () => {
  return (
    <MoviesList
      title="Upcoming Movies"
      endpoint="https://api.themoviedb.org/3/movie/upcoming"
    />
  );
};

export default Comingsoon;
