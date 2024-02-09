const Search = ({ value, onChange }) => {
  return (
    <>
      <input
        className="bg-black rounded-lg outline-none border-2 border-white px-5 py-1 my-1 h-8 w-full"
        placeholder="Пошук..."
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Search;
