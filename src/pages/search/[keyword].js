import { useRouter } from "next/router";
import MoviesList from "../../components/SearchResult";

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <MoviesList
      title={`Search Result for '${String(keyword)}'`}
      keyword={keyword}
    />
  );
};

export default Search;
