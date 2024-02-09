import FavoritesRow from "../components/FavoritesRow";
import { UserAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = UserAuth();

  return (
    <>
      <div className="min-h-[85vh]">
        <div>
          <img
            className="block w-full h-[300px] object-cover "
            src="https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9bff3041-61df-49f7-8d1c-6cf4c0a8d83f/UA-ru-20240115-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="//"
          />

          <div className="bg-black/60 fixed top-0 left-0 w-full h-[300px]" />

          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-nsans-bold ">
              Улюблені фільми
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        {/* <h2 className="text-white font-sans-bold md:text-xl p-4 capitalize">
          Улюблені фільми
        </h2> */}
        <FavoritesRow />
      </div>
    </>
  );
};

export default Profile;
