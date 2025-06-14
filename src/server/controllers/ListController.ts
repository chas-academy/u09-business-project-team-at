import { Request, Response } from "express";
import { handleHttpError, HttpError } from "../HttpError.ts";
import { UserModel } from "../db/User.ts";
import { List, ListModel } from "../db/List.ts";

export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = await UserModel.findById(req.params.id).orFail(
      new HttpError(404, "user not found, somehow")
    );
    const newList = new ListModel({ name });
    await newList.save();
    user.lists.push(newList._id);
    await user.save();
    res.status(201).json(newList).end();
  } catch (e) {
    handleHttpError(e, res);
  }
};

export const viewList = async (req: Request, res: Response) => {
  try {
    const list = await ListModel.findById(req.params.listId).orFail(
      new HttpError(404, "not found")
    );
    res.status(200).json(list).end();
  } catch (e) {
    handleHttpError(e, res);
  }
};

export const listList = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).orFail(
      new HttpError(404, "user not found")
    );
    const lists: List[] = [];
    for (const list of user.lists) {
      lists.push(
        await ListModel.findById(list).orFail(
          new HttpError(404, "list not found, somehow")
        )
      );
    }
    res.status(200).json(lists).end();
  } catch (e) {
    handleHttpError(e, res);
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    const { name, recipes } = req.body;
    const user = await UserModel.findById(req.params.id).orFail(
      new HttpError(404, "user not found, somehow")
    );
    const list = await ListModel.findById(req.params.listId).orFail(
      new HttpError(404, "list not found")
    );
    if (user.lists.includes(list._id)) {
      if (name) {
        list.name = name;
      }
      if (recipes) {
        list.recipes = recipes;
      }
      await list.save();
      res.status(200).json(list).end();
    } else {
      res.status(403).end();
    }
  } catch (e) {
    handleHttpError(e, res);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).orFail(
      new HttpError(404, "user not found, somehow")
    );
    const list = await ListModel.findById(req.params.listId).orFail(
      new HttpError(404, "list not found")
    );
    if (user.lists.includes(list._id)) {
      list.deleteOne();
      res.status(200).json({ message: "List successfully deleted" }).end();
    } else {
      res.status(403).end();
    }
  } catch (e) {
    handleHttpError(e, res);
  }
};
