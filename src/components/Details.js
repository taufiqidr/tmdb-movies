import React from "react";
import Back from "./Back";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import Cast from "./Cast";
import Loading from "./Loading";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchMovieDetails = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${String(id)}?api_key=${apiKey}`
    );
    return response.data;
  };

  const fetchMovieCredits = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${String(
        id
      )}/credits?api_key=${apiKey}`
    );
    return response.data;
  };

  const {
    data: movieDetails,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: errorMovie,
  } = useQuery(
    ["movie", id],
    fetchMovieDetails,
    { enabled: !!id } // Enable the query only if id is available
  );

  const {
    data: credits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
    error: errorCredits,
  } = useQuery(["credits", id], fetchMovieCredits, {
    enabled: !!id,
  });

  if (isLoadingMovie || isLoadingCredits) {
    return <Loading />;
  }

  if (isErrorMovie || isErrorCredits) {
    return (
      <div>
        <p>Error: {errorMovie?.message}</p>
        <p>Error: {errorCredits?.message}</p>
      </div>
    );
  }

  if (movieDetails && credits) {
    const director = credits.crew.find((crew) => crew.job === "Director").name;

    const totalMinutes = movieDetails.runtime;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const runtime = `${hours}h ${minutes}m`;

    const genreNames = movieDetails.genres.map((genre) => genre.name);
    const genreNamesString = genreNames.join(", ");

    const img = () =>
      String(`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`);
    return (
      <div className="container mx-auto flex flex-col p-4">
        <Back />
        <div className="mt-2 flex flex-row items-center justify-between">
          <div className="">
            <h1 className="text-5xl">{movieDetails.title}</h1>
            <div className="mt-2">
              <span className="mr-2">
                {movieDetails.release_date.slice(0, 4)}
              </span>
              <span>{runtime}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span>Rating</span>
            <span className="text-2xl">
              {movieDetails.vote_average.toPrecision(2)}/10
            </span>
          </div>
        </div>
        <div className="mt-2 flex flex-row">
          <Image
            src={img()}
            alt={movieDetails.title}
            loader={img}
            width={240}
            height={480}
            unoptimized={true}
            className="rounded-md  object-cover"
          ></Image>
          <div className="ml-4 flex flex-col justify-between ">
            <p>{movieDetails.overview}</p>
            <div>
              <p className="mt-2">Director: {director}</p>
              <p className="mt-2">Genre: {genreNamesString}</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="my-2 text-3xl underline">Cast</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {credits.cast.slice(0, 30).map((cast, index) => (
              <Cast
                key={index}
                name={cast.name}
                character={cast.character}
                profile_path={cast.profile_path}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
