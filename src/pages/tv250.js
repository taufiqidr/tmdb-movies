import React from "react";
import TvsList from "../components/TvList";

const Tv250 = () => {
  return (
    <TvsList
      title="Top 250 TV Show"
      endpoint="https://api.themoviedb.org/3/tv/top_rated"
    />
  );
};

export default Tv250;
