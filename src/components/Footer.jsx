import { Link } from "react-router-dom";
import { icons } from "../components/data/footerData.js";

const Footer = () => {
  return (
    <div className=" pb-4 px-4">
      <div className="bg-gradient-to-r from-white to-transparent h-[2px] w-[100%] mb-2"></div>
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between items-center py-4 ">
        <Link to="/">
          <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-3xl">
            кіномагія
          </h1>
        </Link>
        <div>
          <span>Усі права захищені "КІНОМАГІЯ" © 2024</span>
        </div>
        <div className="text-black flex gap-4 justify-center items-center">
          {icons.map(({ icon, link }, index) => (
            <a
              className="hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              href={link}
            >
              <img src={icon} width={24} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
