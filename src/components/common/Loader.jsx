import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[85vh] w-full flex items-center justify-center z-50">
      <ClipLoader color="#E53935" />
    </div>
  );
};

export default Loader;
