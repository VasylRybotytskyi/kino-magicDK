import { useState, useEffect } from "react";
import { useGetMovieByNameQuery, useGetMoviesQuery } from "../redux/moviesApi";
import MovieItem from "../components/MovieItem";
import Search from "../components/common/Search";
import Genres from "../components/Genres";
import Button from "../components/common/Button";
import { Pagination } from "@mui/material";

const initialState = {
  language: "uk",
  page: 1,
  with_original_language: "en",
  year: "2023",
  with_genres: "",
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState(initialState);

  const { data: moviesData, isLoading } = useGetMoviesQuery(params, {
    refetchOnMountOrArgChange: true,
  });
  const { data: searchMoviesData } = useGetMovieByNameQuery(searchTerm);

  const handleParamsChange = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData.results);
    }
  }, [moviesData]);

  useEffect(() => {
    if (searchMoviesData?.results?.length > 0) {
      setMovies(searchMoviesData.results);
    } else {
      setMovies(moviesData?.results);
    }
  }, [searchMoviesData, searchTerm, moviesData]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleGenreChange = (id_genre) => {
    if (id_genre === 1) {
      setParams(initialState);
      setSearchTerm(""); // Очищуємо поле пошуку
    } else {
      handleParamsChange("with_genres", id_genre);
    }
  };

  const handlePageChange = (_, num) => {
    handleParamsChange("page", num);
  };

  return (
    <div className="mx-2 pt-[60px] min-h-[100vh]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <Genres handleGenreChange={handleGenreChange} />
        <div className="flex justify-end gap-2 items-center">
          <Search value={searchTerm} onChange={handleSearchChange} />
          <Button
            // onClick={handleReset}
            title="Скинути"
            color={searchTerm.length > 0 ? "" : "gray"}
          />
        </div>
      </div>
      <div className="mt-2 gap-2 w-full h-full grid lg:grid-cols-5 md:grid-cols-4 sml:grid-cols-3 xs:grid-cols-2 ">
        {movies?.map((movie, index) => (
          <MovieItem key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {!searchTerm && (
        <div className="flex items-center justify-center py-10">
          <Pagination
            count={100}
            page={params.page}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-page, & .MuiPaginationItem-ellipsis": {
                color: "white",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "lightgray", // колір активного елемента
              },
              "& .MuiSvgIcon-root": {
                fill: "white",
              },
              "& .MuiPaginationItem-ellipsis:hover": {
                backgroundColor: "transparent", // колір крапок під час наведення
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Movies;
