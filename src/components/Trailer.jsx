import { useRef } from "react";
import { useGetVideoByIdQuery } from "../redux/services/moviesApi";
import Loader from "./common/Loader";

const Trailer = ({ title, closeTrailer, id }) => {
  const { data, isLoading } = useGetVideoByIdQuery(id);
  const results = data?.results;

  const iframeRef = useRef(null);
  const stopVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  };

  const trailer = results?.find((item) => item.key);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-1000 z-50"
      onClick={() => {
        closeTrailer();
        stopVideo();
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-black flex items-center justify-center m-1 w-[360px] h-[200px] md:w-[720px] md:h-[420px] lg:w-[1080px] lg:h-[610px]">
          {trailer ? (
            <iframe
              ref={iframeRef}
              style={{ width: "100%", height: "100%" }}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>Цей фільм не підтримує трейлер українською мовою</>
          )}
        </div>
      )}
    </div>
  );
};

export default Trailer;
