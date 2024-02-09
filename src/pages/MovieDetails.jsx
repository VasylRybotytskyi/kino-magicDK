import { useParams } from "react-router-dom";
import MovieInfo from "../components/MovieInfo";
import Loader from "../components/common/Loader";
import { useGetMovieByIdQuery } from "../redux/moviesApi";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovieByIdQuery(id);

  return <>{isLoading ? <Loader /> : <MovieInfo data={data} />}</>;
};

export default MovieDetails;
