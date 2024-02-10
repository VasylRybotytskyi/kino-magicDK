import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieRow = ({ title, data, handleMovieClick }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const rowId = Math.floor(Math.random() * 1000);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <div>
      <h2 className="font-sans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer "
          size={40}
        />
        <div
          id={`slider` + rowId}
          className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {data.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              handleMovieClick={handleMovieClick}
            />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </div>
  );
};

export default MovieRow;
