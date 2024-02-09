import { useState, useEffect } from "react";
import { useGetMovieByNameQuery, useGetMoviesQuery } from "../redux/moviesApi";
import MovieItem from "../components/MovieItem";
import Search from "../components/common/Search";
import Genres from "../components/Genres";
import Button from "../components/common/Button";
import filterMovies from "../utils/filters/filterMovies";

const Movies = () => {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(1);

  const { data: moviesData } = useGetMoviesQuery(page);
  const { data: searchMoviesData } = useGetMovieByNameQuery(searchTerm);

  useEffect(() => {
    if (moviesData) {
      setOriginalMovies((prevMovies) => [
        ...prevMovies,
        ...filterMovies(moviesData.results),
      ]);
      setMovies((prevMovies) => [
        ...prevMovies,
        ...filterMovies(moviesData.results),
      ]);
    }
  }, [moviesData]);

  useEffect(() => {
    // Якщо є дані з пошукового запиту, оновлюємо список фільмів
    if (searchMoviesData?.results?.length > 0) {
      setMovies(filterMovies(searchMoviesData.results));
    }
    // Якщо пошуковий термін порожній, оновлюємо список фільмів з оригінального списку
    else if (!searchTerm) {
      setMovies(originalMovies);
    }
  }, [searchMoviesData, searchTerm, originalMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        searchMoviesData?.results?.length === 0 &&
        !searchTerm
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchMoviesData, searchTerm]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleGenreChange = (genre) => setSelectedGenre(genre);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedGenre(1);
    setMovies(originalMovies);
    setPage(1);
  };

  const filteredMovies = movies.filter(
    ({ genre_ids }) =>
      selectedGenre === 1 ||
      (genre_ids && genre_ids.includes(parseInt(selectedGenre)))
  );

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="mx-2 py-[60px] min-h-[100vh]">
      <div className="flex  flex-col lg:flex-row lg:justify-between lg:items-center">
        <Genres
          handleGenreChange={handleGenreChange}
          selectedGenre={selectedGenre}
        />
        <div className="flex justify-end gap-2 items-center">
          <Search value={searchTerm} onChange={handleSearchChange} />
          {searchTerm.length > 0 ? (
            <Button onClick={handleReset} title="Скинути" />
          ) : (
            <Button title="Скинути" color="gray" />
          )}
        </div>
      </div>
      <div className="mt-2 gap-2 w-full h-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 ">
        {filteredMovies.map((movie, index) => (
          <MovieItem key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {!searchTerm && (
        <div className="text-center mt-10">
          <Button title="Показати більше" onClick={handleShowMore} />
        </div>
      )}
    </div>
  );
};

export default Movies;
