import { useState } from "react";
import { createImageUrl } from "../services/movieServices";
import Trailer from "./Trailer";
import { FaPlay } from "react-icons/fa";
import Liked from "./common/Liked";
import CircularRate from "./common/CircularRate";
import CastRow from "./CastRow";
import Genres from "./common/GenresRow";
import { motion } from "framer-motion";

const MovieInfo = ({ data }) => {
  const [trailerModal, setTrailerModal] = useState(false);

  const handleTrailerModal = () => {
    setTrailerModal(!trailerModal);
  };

  const {
    id,
    title,
    backdrop_path,
    release_date,
    overview,
    poster_path,
    vote_average,
    genres,
    runtime,
    status,
  } = data;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}г ${remainingMinutes}хв`;
  };

  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url(${createImageUrl(backdrop_path, "original")})`,
      }}
    >
      <div className="w-full bg-black bg-opacity-70 p-4 md:p-8 ">
        <div className=" w-full min-h-full md:flex md:gap-10 pt-[70px] mb-[50px] ">
          {poster_path && (
            <div className="relative w-full md:w-[700px] h-[600px]">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover object-center bg-gradient-to-r from-black to-transparent opacity-90 rounded-lg   "
                src={createImageUrl(poster_path, "original")}
                alt={title}
              />
              <p className="absolute top-3 right-0 bg-black/60 px-7 py-2 rounded-l-lg">
                {formatTime(runtime)}
              </p>
            </div>
          )}

          <div className="w-full md:w-[50%] lg:w-full flex flex-col gap-5 mt-5 md:mt-0">
            <h1 className=" text-3xl lg:text-4xl font-nsans-bold">{title}</h1>

            <div className="flex items-center gap-5">
              <p>Рейтинг:</p>
              <CircularRate value={vote_average} size={50} />
            </div>

            <Genres genres={genres} />

            {status && (
              <div className="flex items-center gap-5">
                <p>Статус:</p>
                <p
                  className={`bg-${
                    status === "Released" ? "green" : "red"
                  }-600 py-1 px-2 rounded-lg`}
                >
                  {status === "Released" ? "В прокаті" : "Незабаром в прокаті"}
                </p>
              </div>
            )}

            <div className="flex gap-4 items-center ">
              <p>Дата виходу:</p>
              <p>{release_date}</p>
            </div>

            <div className="flex gap-[50px] ">
              <div className="relative mt-1">
                <Liked movie={data} />
              </div>
              <button
                onClick={handleTrailerModal}
                className="capitalize border bg-gray-300 text-black py-2 px-5 rounded-lg flex items-center justify-center gap-2"
              >
                <FaPlay />
                <span>Дивитися зараз</span>
              </button>
            </div>

            <div className="flex items-center gap-5">
              <p>Аудіодоріжки:</p>
              <p>Українська</p>
            </div>

            {overview && (
              <div className="flex items-start gap-5">
                <p>Опис:</p>
                <p className="w-full text-gray-200 ">{overview}</p>
              </div>
            )}
          </div>
        </div>

        <CastRow title="Актори" data={data?.credits} />
      </div>

      {trailerModal && (
        <Trailer id={id} closeTrailer={handleTrailerModal} title={title} />
      )}
    </div>
  );
};

export default MovieInfo;
