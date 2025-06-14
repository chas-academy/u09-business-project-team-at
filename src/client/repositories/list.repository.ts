import { List } from "../models/list.model";

export const API_DOMAIN =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const ListRepository = {
  async getAllList(token: string, id: string): Promise<List[]> {
    console.log(token);
    console.log(API_DOMAIN + `/api/list/${id}`);
    const response = await fetch(API_DOMAIN + `/api/list/${id}`);
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
    return response.json();
  },

  async updateList(
    token: string,
    id: string,
    listId: string,
    recipeId: string,
    list: List
  ): Promise<List> {
    const response = await fetch(API_DOMAIN + `/api/list/${id}/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipes: [...list.recipes, recipeId],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update list");
    }
    return response.json();
  },

  async createList(token: string, id: string, name: string): Promise<List> {
    console.log("Creating list with name:", name);
    const response = await fetch(API_DOMAIN + `/api/list/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create list");
    }
    return response.json();
  },

  async getListById(token: string, listId: string): Promise<List> {
    const response = await fetch(API_DOMAIN + `/api/list/list/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch list by ID");
    }
    return response.json();
  },
};
