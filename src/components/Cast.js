import Image from "next/image";
import React from "react";

const Cast = ({ name, character, profile_path }) => {
  const img = () => String(`https://image.tmdb.org/t/p/w500/${profile_path}`);
  return (
    <div className="flex rounded-md border border-gray-300 p-4 shadow-md">
      {profile_path && (
        <div className="mr-4 flex border">
          <Image
            src={img()}
            alt={name}
            loader={img}
            width={240}
            height={240}
            unoptimized={true}
            className="object-cover"
          ></Image>
        </div>
      )}
      <div>
        <p className="mb-2 font-semibold">{name}</p>
        <p className="mb-2 text-sm">{character}</p>
      </div>
    </div>
  );
};

export default Cast;
