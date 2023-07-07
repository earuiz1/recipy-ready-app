import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IngredientsForm from "./components/IngredientsForm";
import { BASE_URL, KEY } from "./utils/urls";
import Loading from "./components/Loading";
import RecipesList from "./components/RecipesList";
import ReactModal from "react-modal";

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
    const updatedIngredients = ingredients.join(",");
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?ingredients=${updatedIngredients}&number=10&ranking=1&apiKey=${KEY}`
        );
        const data = await response.json();
        setRecipes(data);
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
      <div className="my-8">
        <IngredientsForm setIngredients={setIngredients} />
        {!isLoading ? <RecipesList recipes={recipes} /> : <Loading />}
      </div>
    </>
  );
};

export default App;
