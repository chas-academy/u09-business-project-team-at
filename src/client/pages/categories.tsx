import React, { useEffect, useState } from "react";
import RecipeCard from "../components/recipe/recipe-card";
import { RecipeService } from "../services/recipe.service";
import { Recipes, Recipe } from "../models/recipe.model";
import Button from "../components/common/button";

export default function Categories() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async (tag: string) => {
      try {
        const response = await RecipeService.getRecipesByTag(tag);
        setRecipes(response.recipes);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await RecipeService.getTags();
        setTags(response);
        console.log("Fetched tags:", response);
        if (response.length > 0) {
          setCurrentTag(response[0]);
          fetchRecipes(response[0]);
        }
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-auto gap-2 h-16 p-3 overflow-x-auto">
        {/* TODO: Buttons  */}
        {tags.map((tag) => (
          <Button
            variant="transparent"
            children={tag}
            onClick={() => {
              setCurrentTag(tag); // set current tag
              RecipeService.getRecipesByTag(tag) // get data
                .then((response) => {
                  setRecipes(response.recipes); // store data
                })
                .catch((err) => {
                  setError(err as Error);
                });
            }}
          ></Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4 justify-items-center">
        {/* TODO: recipes */}
        {recipes.length > 0 &&
          recipes.map((recipe: Recipe, index: number) => (
            <RecipeCard
              id={recipe.id}
              key={index}
              title={recipe.name}
              image={recipe.image}
              category={recipe.cuisine}
              cookTimeMinutes={recipe.cookTimeMinutes}
              rating={recipe.rating}
            />
          ))}
      </div>
    </div>
  );
}
