import { Video } from "./Recipe";

import { IoCloseSharp } from "react-icons/io5";

type ModalContentProps = {
  video: Video[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContent = ({ video, setModalOpen }: ModalContentProps) => {
  return (
    <>
      {video.map((item, index) => {
        return (
          <div key={index} className="p-6">
            <IoCloseSharp
              size={30}
              className="fill-slate-900 bg-slate-100 absolute top-0 right-0 transform -translate-y-2 translate-x-2 rounded-full p-1 cursor-pointer z-[20]"
              onClick={() => setModalOpen(false)}
            />
            <div className="relative pb-[56.25%] h-0">
              <iframe
                title={`${item.snippet.title} Tutorial Video`}
                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full z-[10]"
              ></iframe>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ModalContent;
