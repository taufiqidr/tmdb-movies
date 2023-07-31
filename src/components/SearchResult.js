import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Loading from "./Loading";

const MoviesList = ({ title, keyword }) => {
  const fetchMovies = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
    );
    return response.data.results;
  };

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery("movies", fetchMovies);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (movies.length == 0 && !isLoading) {
    return (
      <p className="text-white text-center text-4xl">No Result for {keyword}</p>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold">{title}</h1>

      {movies ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MoviesList;
