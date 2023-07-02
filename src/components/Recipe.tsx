import React from "react";
import { Recipes } from "../App";

type RecipeProps = {
  recipe: Recipes;
};
const Recipe = ({ recipe }: RecipeProps) => {
  const { title, image, missedIngredients } = recipe;

  const fetchTutorial = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}&key=${
        import.meta.env.VITE_YOUTUBE_KEY
      }&type=video&maxResults=1`
    );

    const data = await response.json();

    console.log(data);
  };
  return (
    <div className="w-[350px] border-2 p-3 rounded-md">
      <div className="flex flex-col w-full h-full gap-2">
        <p className="font-semibold text-slate-100 text-center">{title}</p>
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
  );
};

export default Recipe;
