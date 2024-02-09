const Genres = ({ genres }) => {
  return (
    <div className="flex items-center  gap-4">
      <p>Жанри:</p>
      <div className="flex gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
        {genres?.map(({ id, name }) => (
          <p key={id} className="bg-red-700 py-1 px-2 rounded-lg ">
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Genres;
