import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import filterMovies from "../utils/filterMovies";
import {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetUpcommingMoviesQuery,
} from "../redux/services/moviesApi";

const Home = () => {
  const { data: popularMoviesData } = useGetPopularMoviesQuery();
  const { data: upcomingMoviesData } = useGetUpcommingMoviesQuery();
  const { data: trendingMoviesData } = useGetTrendingMoviesQuery();

  const ukrainianPopularMovies = filterMovies(popularMoviesData?.results);
  const ukrainianUpcomingMovies = filterMovies(upcomingMoviesData?.results);
  const ukrainianTrendingMovies = filterMovies(trendingMoviesData?.results);

  return (
    <>
      <Hero data={ukrainianPopularMovies} />
      <MovieRow title="Популярні" data={ukrainianPopularMovies} />
      <MovieRow title="Майбутні" data={ukrainianUpcomingMovies} />
      <MovieRow title="В тренді" data={ukrainianTrendingMovies} />
    </>
  );
};

export default Home;
