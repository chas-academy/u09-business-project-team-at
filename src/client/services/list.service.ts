import { ListRepository } from "../repositories/list.repository";
import { List } from "../models/list.model";
export const ListService = {
  async getAllLists(token: string, id: string): Promise<List[]> {
    return await ListRepository.getAllList(token, id);
  },
  async updateList(
    token: string,
    id: string,
    listId: string,
    recipeId: string,
    list: List
  ): Promise<List> {
    return await ListRepository.updateList(token, id, listId, recipeId, list);
  },
  async createList(token: string, id: string, name: string): Promise<List> {
    return await ListRepository.createList(token, id, name);
  },
};
