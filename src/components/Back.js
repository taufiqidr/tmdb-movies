import { useRouter } from "next/router";
import React from "react";
const Back = () => {
  const router = useRouter();
  return (
    <button
      className="w-20 cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-white "
      onClick={() => router.back()}
      role="button"
    >
      Back
    </button>
  );
};

export default Back;
