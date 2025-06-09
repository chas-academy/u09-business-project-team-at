import { RecipeRepository } from "../repositories/recipe.repository";
import { Recipe, Recipes } from "../models/recipe.model";
export const RecipeService = {
  // Fetches all recipes from the repository
  async getRecipes(): Promise<Recipes> {
    return await RecipeRepository.getAllRecipes();
  },

  // Fetches a recipe by its ID
  async getRecipeById(id: number): Promise<Recipe> {
    return await RecipeRepository.getRecipeById(id);
  },

  // Fetches recipes by a specific tag
  async getRecipesByTag(tag: string): Promise<Recipes> {
    return await RecipeRepository.getRecipesByTag(tag);
  },

  // Fetches tags from the repository
  async getTags(): Promise<string[]> {
    return await RecipeRepository.getAllTags();
  },
  // Fetches trending recipes
  async getTrendingRecipes(): Promise<Recipes> {
    return await RecipeRepository.getTrendingRecipes();
  },
};
