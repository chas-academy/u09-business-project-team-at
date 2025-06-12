import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeService } from "../../services/recipe.service";
import { Recipe, Recipes } from "../../models/recipe.model";
import RecipeImage from "../atoms/recipe-image";
import FontStyled from "../atoms/font-styling";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecipeCard from "../molecules/recipe-card";
import Carusel from "../organisms/carusel";
import LineDivider from "../atoms/line-divider";
import Banner from "../molecules/banner";
import Button from "../atoms/button";
import { useModal } from "../../context/ModalContext";

export default function DetailRecipeTemplate() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { invokeAddToListModal } = useModal();

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        RecipeService.getRecipeById(numericId)
          .then((response: Recipe) => {
            setRecipe(response);
          })
          .catch((error) => {
            console.error("Error fetching recipe:", error);
          });
      } else {
        console.error("Invalid recipe id:", id);
      }
    }
  }, [id]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RecipeService.getTrendingRecipes().then((data: Recipes) => {
      setRecipes(data.recipes);
      setLoading(false);
    });
  }, []);

  const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          iconFilled: {
            color: "black",
          },
          iconEmpty: {
            color: "#00000080",
          },
        },
      },
    },
  });

  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <div className="flex flex-col gap-4">
        {recipe && <FontStyled variant="mainTitle">{recipe.name}</FontStyled>}
        <div className="flex flex-col md:flex-row gap-x-4">
          {recipe ? (
            <div className="flex flex-col gap-4">
              <RecipeImage imageUrl={recipe.image} altText={recipe.name} />
              <div>
                <FontStyled variant="recipeInfo">
                  <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex gap-4 items-center">
                      <div>{recipe.cuisine}</div>{" "}
                      <div className="w-0.5 h-4 bg-black"></div>
                      <div className="flex items-center">
                        <ThemeProvider theme={theme}>
                          <Rating
                            defaultValue={recipe.rating}
                            precision={0.5}
                            size="small"
                            readOnly
                            className="flex items-center"
                          />
                        </ThemeProvider>
                      </div>
                      <div className="w-0.5 h-4 bg-black"></div>
                      <div>{recipe.cookTimeMinutes} min</div>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          invokeAddToListModal(true);
                        }}
                      >
                        ADD TO LIST
                      </Button>
                    </div>
                  </div>
                </FontStyled>
              </div>

              <div className="my-4 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-25">
                <div className="flex flex-col gap-4">
                  <FontStyled variant="recipeTitle">INGREDIENTS</FontStyled>
                  <ul className="list-disc pl-5 flex flex-col gap-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <FontStyled variant="recipeTitle">INSTRUCTIONS</FontStyled>
                  <ul className="list-decimal pl-5 flex flex-col gap-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="md:max-w-75 flex flex-wrap sm:flex-nowrap md:flex-col gap-2 box-border md:gap-8 justify-center md:justify-start items-center">
            {recipes.slice(0, 3).map((recipe: Recipe, index: number) => (
              <div
                className="sm:max-w-[calc(1/2.5*100%)] md:max-w-full md:w-full"
                key={index}
              >
                <RecipeCard
                  isLoading={loading}
                  recipe={{
                    id: recipe.id,
                    title: recipe.name,
                    image: recipe.image,
                    category: recipe.cuisine,
                    cookTimeMinutes: recipe.cookTimeMinutes,
                    rating: recipe.rating,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <LineDivider />
      <FontStyled variant="sectionTitle">New Feature</FontStyled>
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        buttonText="LEARN MORE"
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
        to="/recommendation"
      />
      <LineDivider />
      <FontStyled variant="sectionTitle">Trending Recipes</FontStyled>
      <Carusel RenderType="trending" />
    </div>
  );
}
