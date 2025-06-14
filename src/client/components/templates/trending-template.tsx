import Banner from "../molecules/banner";
import Carusel from "../organisms/carusel";
import FontStyled from "../atoms/font-styling";
import LineDivider from "../atoms/line-divider";
import RecipeCards from "../organisms/recipe-cards";
import { Recipes, Recipe } from "../../models/recipe.model";
import { useEffect, useState } from "react";
import { RecipeService } from "../../services/recipe.service";
import RecipeCard from "../molecules/recipe-card";

export default function TrendingTemplate() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RecipeService.getTrendingRecipes().then((data: Recipes) => {
      setRecipes(data.recipes);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-6.5 md:px-4 xl:px-0 w-full max-w-7xl mx-auto">
        <div
          className=" grid justify-items-center
           grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-4 gap-y-8 gap-x-4"
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <RecipeCard key={index} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <FontStyled variant="mainTitle">Trending Recipes</FontStyled>
      <RecipeCards recipes={recipes} />
      <LineDivider />
      <FontStyled variant="sectionTitle">New Feature</FontStyled>
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature Coming Soon!"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
      />
      <LineDivider />
      <FontStyled variant="sectionTitle">All Recipes</FontStyled>
      <Carusel RenderType="recipes" />
    </div>
  );
}
