import React, { useEffect, useState } from "react";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe.model";
import HeroImageLandingPage from "../molecules/hero-image-landing-page";

export default function HeroImage() {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    try {
      RecipeService.getRecipeById(3).then((data: Recipe) => {
        setRecipe(data);
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
  if (!recipe) return <div>Recipe undefined</div>;

  return (
    <>
      <HeroImageLandingPage
        recipeTitle={recipe.name}
        src={recipe.image}
        id={recipe.id}
      />
    </>
  );
}
