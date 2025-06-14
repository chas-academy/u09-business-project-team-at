import Banner from "../molecules/banner";
import Carusel from "../organisms/carusel";
import FontStyled from "../atoms/font-styling";
import LineDivider from "../atoms/line-divider";
import { parsePath, redirect, useLocation } from "react-router-dom";
import { use, useEffect, useState, useCallback } from "react";
import { ListService } from "../../services/list.service";
import { useUser } from "../../context/UserContext";
import { List } from "../../models/list.model";
import { Recipe } from "../../models/recipe.model";
import { editUser } from "../../../server/controllers/UserController";
import { RecipeService } from "../../services/recipe.service";
import RecipeCards from "../organisms/recipe-cards";

export default function ListsTemplate() {
  const location = useLocation();
  const { token } = useUser();
  const [lists, setLists] = useState<List | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    if (!lists || !lists.recipes) return;
    try {
      for (const recipeId of lists.recipes) {
        const recipe = await RecipeService.getRecipeById(Number(recipeId));
        if (recipe) {
          setRecipes((prevRecipes) => [...prevRecipes, recipe]);
        }
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [lists, setRecipes]);

  useEffect(() => {
    fetchRecipes();
  }, [lists]);

  useEffect(() => {
    if (!location.state || !token) {
      window.location.replace("/");
      alert("Don't have access to this list");
    }

    ListService.getListById(token!, location.state.id)
      .then((data) => {
        if (!data) {
          redirect("/");
        }

        setLists(data);
      })
      .catch((error) => {
        console.error("Error fetching list:", error);
        redirect("/");
      });
  }, [location.state]);
  if (!lists) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <FontStyled variant="mainTitle" className="w-full mb-4">
          My Lists
        </FontStyled>
        <div className="rounded-lg border border-[#D9D9D9] w-full">
          <div className="flex flex-col items-center justify-stretch p-4 gap-4 w-full">
            <div>Loading your list...</div>
          </div>
        </div>
      </div>
    );
  }
  const listName = parsePath(location.pathname).pathname?.split("/").pop();
  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <FontStyled variant="mainTitle">{lists.name}</FontStyled>
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
