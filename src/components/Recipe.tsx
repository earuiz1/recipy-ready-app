import { useState } from "react";
import { Recipes } from "../App";

import Modal from "react-modal";
import ModalContent from "./ModalContent";

type RecipeProps = {
  recipe: Recipes;
};

export interface Video {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
  };
}

const Recipe = ({ recipe }: RecipeProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [video, setVideo] = useState<Video[]>([]);
  const { title, image, missedIngredients } = recipe;

  const fetchTutorial = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title} tutorial&key=${
          import.meta.env.VITE_YOUTUBE_KEY
        }&type=video&maxResults=1`
      );
      const data = await response.json();
      setModalOpen(true);
      setVideo(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Tutorial Video Modal"
        className="absolute top-1/2 left-1/2 right-auto bottom-auto -mr-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202020] border-none rounded-md w-[90%] md:w-[70%] lg:w-[50%]"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-slate-950/90"
      >
        <ModalContent video={video} setModalOpen={setModalOpen} />
      </Modal>
      <div className="w-[350px] border-2 p-3 rounded-md">
        <div className="flex flex-col w-full h-full gap-2">
          <p className="font-extrabold text-xl text-slate-100 text-center">
            {title}
          </p>
          <div className="w-full h-[200px] rounded-md">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <p className="font-medium text-sm text-slate-100">
            Missing Ingredients:
          </p>
          <ul className="list-none">
            {missedIngredients.map((item, index) => {
              return (
                <li
                  className="text-xs font-medium text-slate-100 list-disc ml-4"
                  key={index}
                >
                  {item.original}
                </li>
              );
            })}
          </ul>
          <p
            className="font-semibold text-slate-100 text-center mt-auto"
            onClick={fetchTutorial}
          >
            SHOW TUTORIAL
          </p>
        </div>
      </div>
    </>
  );
};

export default Recipe;
