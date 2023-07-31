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
            className="object-cover"
          ></Image>
        </div>
      )}
      <div>
        <h3 className="mb-2 font-semibold">{name}</h3>
        <h4 className="mb-2 text-sm">{character}</h4>
      </div>
    </div>
  );
};

export default Cast;
