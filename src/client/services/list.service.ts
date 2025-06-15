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
    list: List
  ): Promise<List> {
    return await ListRepository.updateList(token, id, listId, list);
  },
  async createList(token: string, id: string, name: string): Promise<List> {
    return await ListRepository.createList(token, id, name);
  },

  async getListById(token: string, listId: string): Promise<List> {
    return await ListRepository.getListById(token, listId);
  },

  async deleteList(
    token: string,
    userId: string,
    listId: string
  ): Promise<void> {
    return ListRepository.deleteList(token, userId, listId);
  },

  async updateListName(
    token: string,
    userId: string,
    listId: string,
    name: string
  ): Promise<List> {
    return await ListRepository.updateListName(token, userId, listId, name);
  },
};
