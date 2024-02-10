import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { db } from "../services/firebase";
import { toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import { createImageUrl } from "../services/movieServices";
import { Link } from "react-router-dom";

const FavoritesRow = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "users", `${user.email}`),
        (doc) => {
          if (doc.exists()) {
            setMovies(doc.data().favShows);
            setIsLoading(false);
          }
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShows = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
    toast.success(`${movie.title} успішно видалено!`);
  };

  return (
    <>
      {isLoading ? (
        <p className="flex items-center justify-center py-10">
          Завантаження улюблених фільмів...
        </p>
      ) : (
        <>
          {movies.length === 0 ? (
            <p className="flex items-center justify-center py-10">
              Додайте фільм до улюблених
            </p>
          ) : (
            <div className="relative flex items-center group">
              <MdChevronLeft
                onClick={() => slide(-500)}
                className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                size={40}
              />
              <div
                id={`slider`}
                className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
              >
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                  >
                    <img
                      className="w-full sm:h-[100px] mdl:h-[110px] lg:h-[150px] block object-cover object-top"
                      src={createImageUrl(
                        movie.backdrop_path ?? movie.poster_path,
                        "w500"
                      )}
                      alt={movie.title}
                    />

                    <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                      <Link to={`/movie/${movie.id}`}>
                        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                          {movie.title}
                        </p>
                      </Link>

                      <p>
                        <AiOutlineClose
                          size={20}
                          onClick={() => handleUnlikeShows(movie)}
                          className="absolute top-2 right-2"
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <MdChevronRight
                onClick={() => slide(500)}
                className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                size={40}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FavoritesRow;
