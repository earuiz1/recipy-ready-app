import React, { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IngredientsProps = {
  setIngredients: React.Dispatch<SetStateAction<string[]>>;
};
interface FormValues {
  ingredients: string;
}

const validationSchema = yup.object().shape({
  ingredients: yup
    .string()
    .required("Please enter ingredients separated by commas")
    .min(3, "Ingredient must be at least 3 characters long")
    .test(
      "comma-separated",
      "Please enter valid ingredients separated by commas",
      (value) => {
        if (!value) return true;
        const ingredients = value
          .split(",")
          .map((ingredient) => ingredient.trim());
        return ingredients.every((ingredient) => ingredient !== "");
      }
    ),
});

const IngredientsForm = ({ setIngredients }: IngredientsProps) => {
  /* React Hook Form */
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = ({ ingredients }: FormValues) => {
    const updatedIngredients = ingredients
      .split(",")
      .map((value) => value.trim());
    setIngredients(updatedIngredients);
    reset();
  };

  return (
    <div className="w-[90%] mx-auto">
      <form className="flex w-full gap-x-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full mb-3">
          <input
            type="text"
            className={`peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-4 text-sm font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:outline-none peer-focus:text-primary text-neutral-200 [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] ${
              errors.ingredients && "border-b-2 border-[#e87c03]"
            }`}
            id="floatingInput"
            placeholder="Search"
            autoComplete="off"
            {...register("ingredients")}
          />
          {errors.ingredients && (
            <p className="text-[#e87c03] font-medium text-sm mt-1">
              {errors.ingredients.message}
            </p>
          )}
          <label
            htmlFor="floatingInput"
            className="text-sm pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-200 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
          >
            Search Recipes By Ingredients
          </label>
        </div>
        <button
          type="submit"
          className="text-slate-100 border border-solid border-neutral-400 px-3 rounded-md self-start h-[58px] text-sm"
        >
          SEARCH RECIPES
        </button>
      </form>
    </div>
  );
};

export default IngredientsForm;
