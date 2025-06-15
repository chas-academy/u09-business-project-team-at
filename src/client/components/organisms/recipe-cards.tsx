import RecipeCard from "../molecules/recipe-card";
import { Recipe } from "../../models/recipe.model";
import { IonContent, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

type RecipeProps = {
  recipes: Recipe[];
  handler?: (recipeId: string) => Promise<void>;
};

export default function RecipeCards({ recipes, handler }: RecipeProps) {
  return (
    <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-4 gap-y-8 gap-x-4">
      {recipes.map((recipe: Recipe, index: number) => (
        <div
          key={index}
          className="flex items-center justify-center w-full relative"
        >
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
          {handler && (
            <div className="absolute top-2 right-2 bg-[#000000B9] hover:bg-white cursor-pointer rounded-full shadow-md justify-center items-center flex p-2">
              <button
                className="text-red-500 hover:text-red-700 text-2xl justify-center items-center flex cursor-pointer"
                onClick={() => handler(recipe.id.toString())}
              >
                <IonIcon icon={trashOutline} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
