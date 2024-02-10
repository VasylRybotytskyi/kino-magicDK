import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import genresList from "../data/genresData";

const Genres = ({ handleGenreChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(1);

  const handleGenreClick = (genre, e) => {
    setSelectedGenre(genre);

    if (genre === "..." && isExpanded) {
      setIsExpanded(false);
    } else {
      handleGenreChange(genre);
    }
    e.stopPropagation();
  };

  return (
    <ul className="flex flex-wrap gap-1 md:gap-2 my-4">
      {genresList.slice(0, isExpanded ? genresList.length : 4).map((genre) => (
        <li
          key={genre.id}
          className={`px-2 py-1 cursor-pointer ${
            genre.id === selectedGenre ? "bg-red-600 rounded-lg" : ""
          }`}
          onClick={(e) => handleGenreClick(genre.id, e)}
        >
          {genre.name}
        </li>
      ))}
      {genresList.length > 4 && (
        <div className="flex justify-end">
          <div
            className="p-1 cursor-pointer text-white flex items-center "
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </div>
        </div>
      )}
    </ul>
  );
};

export default Genres;
