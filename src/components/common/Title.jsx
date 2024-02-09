const Title = ({ title }) => {
  return (
    <div className="w-full ml-5 text-center">
      <p className="text-xl ">{title}</p>
      <div className="bg-gradient-to-r from-white to-transparent h-[2px] w-[100%]"></div>
    </div>
  );
};

export default Title;
