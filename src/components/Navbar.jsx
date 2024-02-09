import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { PiFilmSlateBold } from "react-icons/pi";
import { toast } from "react-toastify";
import Button from "./common/Button";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      toast.success("Ви вийшли із системи");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="absolute w-full p-2 flex items-center justify-between z-20">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-3xl ">
          кіномагія
        </h1>
      </Link>

      {user ? (
        <div className="flex items-center">
          <Link to="/movies" className="hidden md:inline-block capitalize pr-4">
            Фільми
          </Link>
          <Link
            to="/movies"
            className="inline-block md:hidden capitalize pr-4 "
          >
            <PiFilmSlateBold size={25} />
          </Link>

          <Link
            to="/profile"
            className="inline-block md:hidden capitalize pr-4 "
          >
            <FaUser size={20} />
          </Link>
          <Link to="/profile">
            <button className="hidden md:inline-block capitalize pr-4">
              Профіль
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="hidden md:block capitalize bg-red-600 hover:bg-red-800 px-2 py-1 rounded-lg cursor-pointer transition ease-out duration-500"
          >
            Вийти
          </button>
          <button
            onClick={handleLogout}
            className="md:hidden capitalize bg-red-600 active:bg-red-700 p-1 rounded cursor-pointer "
          >
            <IoExitOutline />
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <Button title="Увійти" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
