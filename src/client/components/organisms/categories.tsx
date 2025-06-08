import React, { useEffect, useState, useCallback } from "react";

// UI components and icons
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import RecipeCard from "../molecules/recipe-card";
import Button from "../atoms/button";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

// services for fetching external data
import { RecipeService } from "../../services/recipe.service";
import { Recipes, Recipe } from "../../models/recipe.model";

export default function Categories() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [winSize, setWinSize] = useState(0);
  const [allTags, setAllTags] = useState<string[]>([]);

  const fetchRecipes = async (tag?: string) => {
    try {
      if (!tag) {
        const response = await RecipeService.getRecipes();
        setRecipes(response.recipes);
        setLoading(false);
        return;
      }
      const response = await RecipeService.getRecipesByTag(tag);
      setRecipes(response.recipes);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };
  const fetchTags = useCallback(async () => {
    try {
      const response = await RecipeService.getTags();
      setAllTags(response);

      // Calculate the number of tags to display based on window width
      const tagsNumber = Math.floor((window.innerWidth - 180) / 140);
      setTags(response.slice(0, tagsNumber));

      fetchRecipes();
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  }, []);

  // Adjust the number of tags displayed based on window size.
  const onPhoneWindowSize = useCallback(() => {
    const tagsNumber = Math.floor((window.innerWidth - 180) / 140);
    setTags((prev) => allTags.slice(0, tagsNumber));
  }, [allTags]);

  useEffect(() => {
    if (!tags.length) {
      fetchTags().catch(console.error);
    }
  }, [fetchTags, tags.length]);

  useEffect(() => {
    const handleResize = () => {
      setWinSize(window.innerWidth);
    };

    setWinSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (allTags.length > 0) {
      onPhoneWindowSize();
    }
  }, [onPhoneWindowSize, allTags, winSize]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex gap-4 md:overflow-hidden flex-row w-full justify-between max-h-9">
        <Button
          variant="transparent"
          children="All"
          onClick={() => {
            fetchRecipes();
          }}
        ></Button>

        {tags.slice(0, 9).map((tag) => (
          <Button
            key={tag}
            variant="transparent"
            children={tag}
            onClick={() => {
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
        {allTags.length > 10 && (
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
              <div className="bg-white w-auto justify-center flex items-center">
                <Button
                  variant="transparent"
                  className="flex items-center flex-nowrap min-w-24"
                >
                  Show More
                  <IonIcon icon={chevronDownOutline}></IonIcon>
                </Button>
              </div>
            </MenuHandler>

            <MenuList className="h-3/4 overflow-y-auto border-2 border-black w-35">
              {/* 
              
              TODO: Add search if you have time 
              <Input
                placeholder="Search..."
                className="flex text-center border-2 focus:border-2 focus:outline-black border-[#D9D9D980] rounded-sm"
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              /> */}

              {allTags
                .slice(allTags.length == tags.length ? 0 : tags.length)
                .map((tag) => {
                  return (
                    <MenuItem
                      key={tag}
                      className="hover:bg-black hover:text-white transform transition-transform duration-300 p-2"
                      onClick={() => {
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
                  );
                })}
            </MenuList>
          </Menu>
        )}
      </div>

      <div
        className=" grid justify-items-center
           grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-4 gap-y-8 gap-x-4"
      >
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
    </>
  );
}
