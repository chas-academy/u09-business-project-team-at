import React, { useEffect, useState } from "react";
import RecipeCard from "../molecules/recipe-card";
import { RecipeService } from "../../services/recipe.service";
import { Recipes, Recipe } from "../../models/recipe.model";
import SectionGrid from "../molecules/section-grid";

export default function Carusel() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    try {
      RecipeService.getRecipes().then((data: Recipes) => {
        setRecipes(data.recipes);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching recipes from service:", error);
      setError(error as Error);
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-hidden">
      <SectionGrid>
        {recipes.map((recipe: Recipe, index: number) => (
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
      </SectionGrid>
    </div>
  );
}
