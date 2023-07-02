import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IngredientsForm from "./components/IngredientsForm";

import { BASE_URL, KEY } from "./utils/urls";
import RecipesList from "./components/RecipesList";

export interface Recipes {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissingIngredients[];
  usedIngredients: [];
  unusedIngredients: [];
  likes: number;
}

export interface MissingIngredients {
  original: string;
}

const App = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  useEffect(() => {
    const updatedIngredients = ingredients.join(",");
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?ingredients=${updatedIngredients}&number=10&ranking=1&apiKey=${KEY}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <>
      <Navbar />
      <IngredientsForm setIngredients={setIngredients} />
      <RecipesList recipes={recipes} />
    </>
  );
};

export default App;
