import React from "react";
import Back from "./Back";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import Cast from "./Cast";

const TvDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchTvDetails = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${String(id)}?api_key=${apiKey}`
    );
    return response.data;
  };

  const fetchTvCredits = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${String(id)}/credits?api_key=${apiKey}`
    );
    return response.data;
  };

  const {
    data: tvDetails,
    isLoading: isLoadingTv,
    isError: isErrorTv,
    error: errorTv,
  } = useQuery(
    ["tv", id],
    fetchTvDetails,
    { enabled: !!id } // Enable the query only if id is available
  );

  const {
    data: credits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
    error: errorCredits,
  } = useQuery(["credits", id], fetchTvCredits, {
    enabled: !!id,
  });

  if (isLoadingTv || isLoadingCredits) {
    return <div>Loading...</div>;
  }

  if (isErrorTv || isErrorCredits) {
    return (
      <div>
        <p>Error: {errorTv?.message}</p>
        <p>Error: {errorCredits?.message}</p>
      </div>
    );
  }

  if (tvDetails && credits) {
    const creatorNames = tvDetails.created_by.map((creator) => creator.name);
    const creator = creatorNames.join(", ");

    const genreNames = tvDetails.genres.map((genre) => genre.name);
    const genreNamesString = genreNames.join(", ");

    const img = () =>
      String(`https://image.tmdb.org/t/p/w500/${tvDetails.poster_path}`);
    return (
      <div className="container mx-auto flex flex-col p-4">
        <Back />
        <div className="mt-2 flex flex-row items-center justify-between">
          <div className="">
            <h1 className="text-5xl">{tvDetails.name}</h1>
            <div className="mt-2">
              <span className="mr-2">
                {tvDetails.first_air_date.slice(0, 4)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span>Rating</span>
            <span className="text-2xl">
              {tvDetails.vote_average.toPrecision(2)}/10
            </span>
          </div>
        </div>
        <div className="mt-2 flex flex-row">
          <Image
            src={img()}
            alt={tvDetails.name}
            loader={img}
            width={240}
            height={480}
            unoptimized={true}
            className="rounded-md  object-cover"
          ></Image>
          <div className="ml-4 flex flex-col justify-between ">
            <p>{tvDetails.overview}</p>
            <div>
              <p className="mt-2">Created By: {creator}</p>
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

export default TvDetails;
