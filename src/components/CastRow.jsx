import { createImageUrl } from "../services/movieServices";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CastRow = ({ title, data, handleMovieClick }) => {
  const { cast } = data;
  const rowId = Math.floor(Math.random() * 1000);

  const slide = (offset) => {
    const slider = document.getElementById("sliderCast" + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const filteredCast = cast.filter((actor) => actor.profile_path);

  return (
    <div>
      <h2 className="font-sans-bold text-2xl px-4 capitalize ">{title}</h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={`sliderCast` + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {filteredCast.map(({ profile_path, name }, index) => (
            <div
              key={index}
              className="relative inline-block rounded-lg overflow-hidden cursor-pointer m-2 "
            >
              <img
                className="w-full h-[220px] block object-cover object-top relative"
                src={createImageUrl(profile_path, "w500")}
                alt={title}
                loading="lazy"
              />
              <p className="absolute bottom-0 flex justify-center bg-black/60 w-full py-2 text-sm">
                {name}
              </p>
            </div>
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

export default CastRow;
