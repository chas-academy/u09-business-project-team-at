import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeService } from "../services/recipe.service";
import { Recipe, Recipes } from "../models/recipe.model";

export default function DetailRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (id) {
      RecipeService.getRecipeById(id)
        .then((response: Recipe) => {
          setRecipe(response);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    }
  }, [id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h1>{recipe.name}</h1>
          <img src={recipe.image} alt="" className="h-20 w-auto" />
          <p>{recipe.difficulty}</p>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
}
