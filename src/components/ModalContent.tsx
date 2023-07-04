import { Video } from "./Recipe";

type ModalContentProps = {
  video: Video[];
  isLoading: boolean;
};

const ModalContent = ({ video }: ModalContentProps) => {
  return (
    <>
      {video.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="font-bold text-xl text-slate-100 text-center">
              {item.snippet.title}
            </h2>
            <iframe
              title={`${item.snippet.title} Tutorial Video`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              allowFullScreen
            ></iframe>
          </div>
        );
      })}
    </>
  );
};

export default ModalContent;
