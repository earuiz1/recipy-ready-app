import React from "react";

import { Recipes } from "../App";
import Recipe from "./Recipe";

type RecipesListProps = {
  recipes: Recipes[];
};
const RecipesList = ({ recipes }: RecipesListProps) => {
  return (
    <div className="w-[90%] mx-auto">
      <div className=" w-full flex justify-center flex-wrap gap-4 ">
        {recipes.map((recipe, index) => {
          return <Recipe key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default RecipesList;
