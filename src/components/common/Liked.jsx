import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserAuth } from "../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Liked = ({ movie }) => {
  const { user } = UserAuth();
  const { id, title, backdrop_path, release_date, overview } = movie;
  const userEmail = user?.email;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (userEmail) {
        const userDocRef = doc(db, "users", userEmail);
        const userDocSnap = await getDoc(userDocRef);
        const favShows = userDocSnap.data()?.favShows || [];
        const isMovieLiked = favShows.some((favMovie) => favMovie.id === id);
        setIsLiked(isMovieLiked);
      }
    };

    checkIfLiked();
  }, [userEmail, id]);

  const toggleLiked = async () => {
    if (!userEmail) {
      toast.error("Увійдіть, щоб зберегти фільм");
      return;
    }

    const userDocRef = doc(db, "users", userEmail);
    const movieData = { id, title, backdrop_path, release_date, overview };

    try {
      if (isLiked) {
        await updateDoc(userDocRef, {
          favShows: arrayRemove(movieData),
        });
        toast.error(`${title} видалено із улюблених`);
      } else {
        await updateDoc(userDocRef, {
          favShows: arrayUnion(movieData),
        });
        toast.success(`${title} додано до улюблених`);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Помилка при оновленні улюблених фільмів:", error);
    }
  };

  return (
    <p onClick={toggleLiked} className="cursor-pointer">
      <FaHeart
        size={20}
        className={`absolute top-2 left-2 hover:scale-110 transition ease-in-out duration-300 ${
          isLiked ? "text-red-600" : "text-gray-300"
        }`}
      />
    </p>
  );
};

export default Liked;
