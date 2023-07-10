import { useState } from "react";
import { Recipes } from "../App";
import { TfiYoutube } from "react-icons/tfi";
import Modal from "react-modal";
import ModalContent from "./ModalContent";
import { GOOGLE_BASE_URL, GOOGLE_KEY } from "../utils/apiConfig";

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
  const [isReadMore, setReadMore] = useState(false);
  const { title, image, missedIngredients, usedIngredients } = recipe;

  const fetchTutorial = async () => {
    try {
      const response = await fetch(
        `${GOOGLE_BASE_URL}?part=snippet&q=${title}&key=${GOOGLE_KEY}&type=video&maxResults=1`
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
        className="absolute top-1/2 left-1/2 right-auto bottom-auto -mr-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202020] border border-neutral-500 shadow-lg shadow-slate-800 rounded-md w-[90%] md:w-[70%] lg:w-[50%]"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-slate-950/90"
      >
        <ModalContent video={video} setModalOpen={setModalOpen} />
      </Modal>
      <div className="w-[350px] border border-neutral-400 px-3 py-5 rounded-md shadow-md shadow-slate-600 transform hover:scale-[105%]">
        <div className="flex flex-col w-full h-full gap-4">
          <h2 className="font-bold text-2xl text-slate-100 text-center">
            {title}
          </h2>
          <div className="w-full h-[200px] rounded-md">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-100 mb-2">
              Missing Ingredients:
            </p>
            <ul className="list-none">
              {missedIngredients.map((item, index) => {
                return (
                  <li
                    className="text-xs font-light text-neutral-200 list-disc ml-4"
                    key={index}
                  >
                    {item.original}
                  </li>
                );
              })}
            </ul>
          </div>
          <p
            className={
              isReadMore
                ? "hidden"
                : "block text-slate-100 text-sm font-medium text-center cursor-pointer hover:underline hover:underline-offset-4"
            }
            onClick={() => setReadMore(true)}
          >
            Read More
          </p>
          <div className={isReadMore ? "block" : "hidden"}>
            <p className="font-semibold text-sm text-slate-100 mb-2">
              Used Ingredients:
            </p>
            <ul className="list-none">
              {usedIngredients.map((item, index) => {
                return (
                  <li
                    className="text-xs font-light text-neutral-200 list-disc ml-4"
                    key={index}
                  >
                    {item.original}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className="mt-auto bg-transparent border border-neutral-200 self-end rounded-md py-2 px-3 outline-none hover:bg-red-600/90"
            onClick={fetchTutorial}
          >
            <TfiYoutube className="fill-slate-100" size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Recipe;
