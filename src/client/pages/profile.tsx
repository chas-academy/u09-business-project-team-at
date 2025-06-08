import React, { useEffect, useState } from "react";
import SectionGrid from "../components/recipe/section-grid";
import RecipeCard from "../components/recipe/recipe-card";
import { RecipeService } from "../services/recipe.service";
import { Recipes, Recipe } from "../models/recipe.model";
import Banner from "../components/recipe/banner";

const Profile = () => {
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
    <div className="mt-65 md:px-4 xl:px-0 w-full max-w-7xl mx-auto">
      {" "}
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
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        buttonText="LEARN MORE"
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
        to="/recommendation"
      />
    </div>
  );
};

export default Profile;
