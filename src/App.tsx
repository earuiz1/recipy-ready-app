import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IngredientsForm from "./components/IngredientsForm";

interface Recipes {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: [];
  usedIngredients: [];
  unusedIngredients: [];
  likes: number;
}

const App = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  useEffect(() => {
    const updatedIngredients = ingredients.join(",");
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${updatedIngredients}&number=2&ranking=1&apiKey=${
            import.meta.env.VITE_SPOONACULAR_KEY
          }`
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
    </>
  );
};

export default App;
