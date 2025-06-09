import React, { useEffect, useState } from "react";
import RecipeCard from "../molecules/recipe-card";
import { RecipeService } from "../../services/recipe.service";
import { Recipes, Recipe } from "../../models/recipe.model";
import SectionGrid from "../molecules/section-grid";

type CaruselProps = {
  RenderType: "trending" | "recipes" | "userList";
};

export default function Carusel(props: CaruselProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    try {
      if (props.RenderType === "recipes") {
        RecipeService.getRecipes().then((data: Recipes) => {
          setRecipes(data.recipes);
          setLoading(false);
        });
      }

      if (props.RenderType === "trending") {
        RecipeService.getTrendingRecipes().then((data: Recipes) => {
          setRecipes(data.recipes);
          setLoading(false);
        });
      }

      // TODO: If RenderType is userList, implement logic to fetch user-specific recipes
    } catch (error) {
      console.error("Error fetching recipes from service:", error);
      setError(error as Error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden">
        <SectionGrid>
          {Array.from({ length: 12 }).map((_, index) => (
            <RecipeCard key={index} isLoading={true} />
          ))}
        </SectionGrid>
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-hidden">
      <SectionGrid>
        {recipes.map((recipe: Recipe, index: number) => (
          <RecipeCard
            key={recipe.id}
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
      </SectionGrid>
    </div>
  );
}
