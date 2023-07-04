import React, { SetStateAction, FormEvent, useRef } from "react";

type IngredientsProps = {
  setIngredients: React.Dispatch<SetStateAction<string[]>>;
};

const IngredientsForm = ({ setIngredients }: IngredientsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      const values: string = inputRef.current.value;
      const updatedValue = values.split(",").map((value) => value.trim());

      setIngredients(updatedValue);
    }
  };
  return (
    <div className="w-[90%] mx-auto">
      <p className="text-slate-100 font-medium text-lg">
        Search Recipes By Ingredients:
      </p>
      <form className="flex w-full gap-x-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ingredients separeated by a commas"
          className="rounded-md px-2 focus:outline-none focus:border-2 focus:border-purple-500 w-full"
          ref={inputRef}
        />
        <button
          type="submit"
          className="text-slate-100 border-2 px-3 rounded-md"
        >
          SEARCH RECIPES
        </button>
      </form>
    </div>
  );
};

export default IngredientsForm;
