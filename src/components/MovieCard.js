import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ id, title, release_date, poster_path }) => {
  const img = () => String(`https://image.tmdb.org/t/p/w500/${poster_path}`);
  return (
    <Link href={`/movie/${id}`}>
      <div className="card rounded-md border border-gray-300 p-4 shadow-md">
        {poster_path && (
          <Image
            src={img()}
            alt={title}
            loader={img}
            width={240}
            height={240}
            unoptimized={true}
            className="mb-4 w-full rounded-md object-cover"
          ></Image>
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{release_date.slice(0, 4)}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
