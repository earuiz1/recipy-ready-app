import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IngredientsForm from "./components/IngredientsForm";
import { SPOONACULAR_BASE_URL, SPOONACULAR_KEY } from "./utils/apiConfig";
import Loading from "./components/Loading";
import RecipesList from "./components/RecipesList";
import ReactModal from "react-modal";
import Hero from "./components/Hero";

export interface Recipes {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissingIngredients[];
  usedIngredients: UsedIngredients[];
  unusedIngredients: [];
  likes: number;
}

export interface MissingIngredients {
  original: string;
}

export interface UsedIngredients {
  original: string;
}

ReactModal.setAppElement("#root");

const App = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (ingredients.length === 0) {
      return; // Skip API request if ingredients array is empty
    }
    const updatedIngredients = ingredients.join(",");
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${SPOONACULAR_BASE_URL}?ingredients=${updatedIngredients}&number=12&ranking=1&apiKey=${SPOONACULAR_KEY}`
        );
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecipes(data);
        } else {
          setRecipes([]); // Set empty array when no recipes found
          alert("No recipes found!");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="my-8">
        <IngredientsForm setIngredients={setIngredients} />
        {!isLoading ? <RecipesList recipes={recipes} /> : <Loading />}
      </div>
    </>
  );
};

export default App;
