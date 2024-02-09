const Button = ({ title, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        color === "gray" ? "bg-gray-400 " : "bg-red-600 hover:bg-red-800"
      } px-2 py-1 rounded-lg text-white transition ease-out duration-500`}
    >
      {title}
    </button>
  );
};

export default Button;
