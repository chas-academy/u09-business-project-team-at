import RecipeCard from "../molecules/recipe-card";
import { Recipe } from "../../models/recipe.model";

type RecipeProps = {
  recipes: Recipe[];
};

export default function RecipeCards({ recipes }: RecipeProps) {
  return (
    <div
      className="grid justify-items-center
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-4 gap-y-8 gap-x-4"
    >
      {recipes.map((recipe: Recipe, index: number) => (
        <RecipeCard
          key={index}
          recipe={{
            id: recipe.id,
            title: recipe.name,
            image: recipe.image,
            category: recipe.cuisine,
            cookTimeMinutes: recipe.cookTimeMinutes,
            rating: recipe.rating,
          }}
        />
      ))}
    </div>
  );
}
