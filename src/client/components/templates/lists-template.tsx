import Banner from "../molecules/banner";
import Carusel from "../organisms/carusel";
import FontStyled from "../atoms/font-styling";
import LineDivider from "../atoms/line-divider";
import {
  parsePath,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { use, useEffect, useState, useCallback } from "react";
import { ListService } from "../../services/list.service";
import { useUser } from "../../context/UserContext";
import { List } from "../../models/list.model";
import { Recipe } from "../../models/recipe.model";
import { editUser } from "../../../server/controllers/UserController";
import { RecipeService } from "../../services/recipe.service";
import RecipeCards from "../organisms/recipe-cards";
import Button from "../atoms/button";
import { useModal } from "../../context/ModalContext";

export default function ListsTemplate() {
  const location = useLocation();
  const { token, user } = useUser();
  const [list, setList] = useState<List | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { invokeEditListNameModal } = useModal();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    if (!list || !list.recipes) return;
    try {
      for (const recipeId of list.recipes) {
        const recipe = await RecipeService.getRecipeById(Number(recipeId));
        if (recipe) {
          setRecipes((prevRecipes) => [...prevRecipes, recipe]);
        }
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [list, setRecipes]);

  const handleDeleteList = useCallback(
    async (listId: string, listName: string) => {
      if (!token || !user?.id) {
        setError("Please log in to delete lists");
        return;
      }

      if (
        !window.confirm(
          `Are you sure you want to delete "${listName}"? You can restore it later from deleted lists.`
        )
      ) {
        return;
      }

      try {
        await ListService.deleteList(token, user.id, listId);
        setError(null);
        navigate("/profile");
      } catch (err) {
        console.error("Error deleting list:", err);
        setError("Failed to delete the list");
      }
    },
    [token, user?.id]
  );

  const removeRecipeFromList = useCallback(
    async (recipeId: string) => {
      if (!token || !user?.id || !list) {
        setError("Please log in to remove recipes from lists");
        return;
      }
      try {
        const newRecipeList = list.recipes.filter((id) => id !== recipeId);

        const updatedList = await ListService.updateList(
          token,
          user.id,
          list._id,
          {
            ...list,
            recipes: newRecipeList,
          }
        );
        setList(updatedList);
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== Number(recipeId))
        );
      } catch (error) {
        console.error("Error removing recipe from list:", error);
        setError("Failed to remove recipe from list");
      }
    },
    [token, user?.id, list]
  );

  useEffect(() => {
    if (recipes.length > 0) {
      return;
    }
    fetchRecipes();
  }, [list]);

  useEffect(() => {
    const match = location.pathname.match(/\/list\/(\w+)/);
    if (!token || !match) {
      redirect("/");
      alert("Don't have access to this list");
      return;
    }

    const listId = match[1];
    ListService.getListById(token!, listId)
      .then((data) => {
        if (!data) {
          redirect("/");
        }

        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching list:", error);
        redirect("/");
      });
  }, [location.state]);
  if (!list) {
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
  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-col justify-center w-full">
          <FontStyled variant="mainTitle">{list.name}</FontStyled>
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button onClick={() => invokeEditListNameModal(true)}>
            Edit List Name
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteList(list._id, list.name)}
          >
            Delete List
          </Button>
        </div>
      </div>
      <RecipeCards recipes={recipes} handler={removeRecipeFromList} />
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
