import React from "react";
import TvsList from "../components/TvList";

const Populartv = () => {
  return (
    <TvsList
      title="Most Popular TV Show"
      endpoint="https://api.themoviedb.org/3/tv/popular"
    />
  );
};

export default Populartv;
