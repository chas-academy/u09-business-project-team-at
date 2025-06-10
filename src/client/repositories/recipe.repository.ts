import { get } from "http";
import { Recipe, Recipes } from "../models/recipe.model";

export const RECIPE_ENDPOINT_BASE = "https://dummyjson.com/recipes";

export const RecipeRepository = {
  async getAllRecipes(): Promise<Recipes> {
    const response = await fetch(RECIPE_ENDPOINT_BASE);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    return response.json();
  },

  async getRecipeById(id: number): Promise<Recipe> {
    const response = await fetch(`${RECIPE_ENDPOINT_BASE}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe with id ${id}`);
    }
    return response.json();
  },

  async getRecipesByTag(tag: string): Promise<Recipes> {
    const response = await fetch(`${RECIPE_ENDPOINT_BASE}/tag/${tag}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes with tag ${tag}`);
    }
    return response.json();
  },

  async getTrendingRecipes(): Promise<Recipes> {
    const response = await fetch(
      `${RECIPE_ENDPOINT_BASE}?sortBy=rating&order=desc&limit=12`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch trending recipes");
    }
    return response.json();
  },

  async getAllTags(): Promise<string[]> {
    const response = await fetch(`${RECIPE_ENDPOINT_BASE}/tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe tags");
    }
    const data = await response.json();
    return data || [];
  },
};
