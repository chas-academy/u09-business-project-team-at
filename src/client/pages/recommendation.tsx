import React, { useEffect, useState } from "react";
import RecipeCard from "../components/recipe/recipe-card";
import { RecipeService } from "../services/recipe.service";
import { Recipes, Recipe } from "../models/recipe.model";
import Button from "../components/common/button";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";

export default function Recommendation() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

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
      if (response.length > 0) {
        setCurrentTag(response[0]);
        fetchRecipes(response[0]);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-6.5 md:px-4 xl:px-0 w-full max-w-7xl mx-auto relative">
      <div className="flex gap-4 md:overflow-hidden flex-row w-full h-9 ">
        {tags.slice(0, 10).map((tag) => (
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
        {tags.length > 2 && (
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            dismiss={{
              itemPress: false,
            }}
          >
            <MenuHandler>
              <div className="bg-white w-auto absolute right-0 z-10">
                <Button variant="transparent">
                  Menu<IonIcon icon={chevronDownOutline}></IonIcon>
                </Button>
              </div>
            </MenuHandler>

            <MenuList
              as="div"
              className="h-3/4 overflow-y-auto border-2 border-black w-35"
            >
              <Input
                placeholder="Search..."
                className="flex text-center border-2 focus:border-2 focus:outline-black border-[#D9D9D980] rounded-sm"
              />
              {tags.map((tag) => (
                <MenuItem
                  as={React.Fragment}
                  key={tag}
                  className="hover:bg-black hover:text-white transform transition-transform duration-300"
                  onClick={() => {
                    setCurrentTag(tag);
                    RecipeService.getRecipesByTag(tag)
                      .then((response) => {
                        setRecipes(response.recipes);
                      })
                      .catch((err) => {
                        setError(err as Error);
                      });
                  }}
                >
                  {tag}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </div>

      <div
        className=" grid justify-items-center
       grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pt-4"
      >
        {/* TODO: recipes */}
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
      </div>
    </div>
  );
}
