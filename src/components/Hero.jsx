import { useEffect, useState } from "react";
import { createImageUrl } from "../services/movieServices";
import Trailer from "./Trailer";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Hero = ({ data }) => {
  const [movie, setMovie] = useState({});
  const [trailerModal, setTrailerModal] = useState(false);

  useEffect(() => {
    if (data?.length) {
      const randomMovie = data[Math.floor(Math.random() * data.length)];
      setMovie(randomMovie);
    }
  }, [data]);

  const handleTrailerModal = () => {
    setTrailerModal(!trailerModal);
  };

  const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const { id, title, backdrop_path, release_date, overview } = movie;

  return (
    <div className="w-full h-[550px] lg:h-[750px] ">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[750px] ">
          {backdrop_path && (
            <img
              className="w-full h-full object-cover object-center bg-gradient-to-r from-black to-transparent opacity-40"
              src={createImageUrl(backdrop_path, "original")}
              alt={title}
              loading="lazy"
            />
          )}

          <div className="bg-gradient-to-r from-white to-transparent h-[2px] w-[100%]"></div>

          <div className="absolute w-full top-[20%] lg:top-[25%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold">{title}</h1>
            <div className="flex mt-8 mb-4">
              <button
                onClick={handleTrailerModal}
                className="capitalize border bg-gray-300 text-black py-2 px-5 rounded-lg "
              >
                Трейлер
              </button>
              <Link to={`/movie/${id}`}>
                <button className="capitalize border border-gray-300 py-2 pr-5 pl-2 ml-4 rounded-lg flex items-center gap-2">
                  <IoIosInformationCircleOutline />
                  Деталі
                </button>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">{release_date}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 ">
              {truncate(overview, 165)}
            </p>
          </div>
        </div>
      </div>
      {trailerModal && (
        <Trailer closeTrailer={handleTrailerModal} id={id} title={title} />
      )}
    </div>
  );
};

export default Hero;
