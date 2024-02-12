import { motion } from "framer-motion";
import { createImageUrl } from "../services/movieServices";
import { Link } from "react-router-dom";
import Liked from "./common/Liked";
import CircularRate from "./common/CircularRate";

const MovieItem = ({ movie }) => {
  const { id, title, backdrop_path, poster_path, vote_average } = movie;

  return (
    <motion.div
      className="relative inline-block rounded-lg overflow-hidden cursor-pointer m-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        className="w-full md:h-[120px] lg:h-[150px] block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
        loading="lazy"
      />

      <motion.div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 transition ease-out duration-500">
        <Link to={`/movie/${id}`}>
          <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
            {title}
          </p>

          <div className="absolute right-1 bottom-1">
            <CircularRate value={vote_average} size={30} />
          </div>
        </Link>

        <Liked movie={movie} color="black" />
      </motion.div>
    </motion.div>
  );
};

export default MovieItem;
