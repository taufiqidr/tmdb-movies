import { useQuery } from "react-query";
import axios from "axios";
import TvCard from "../components/TvCard";

const TvsList = ({ title, endpoint }) => {
  const fetchTvs = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(`${endpoint}?api_key=${apiKey}`);
    return response.data.results;
  };

  const { data: tvs, isLoading, isError, error } = useQuery("tvs", fetchTvs);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold">{title}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {tvs
          ? tvs.map((tv, index) => (
              <TvCard
                key={index}
                id={tv.id}
                name={tv.name}
                first_air_date={tv.first_air_date}
                poster_path={tv.poster_path}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TvsList;
