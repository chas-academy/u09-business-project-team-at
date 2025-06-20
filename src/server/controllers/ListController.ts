import { Request, Response } from "express";
import { handleHttpError, HttpError } from "../HttpError.ts";
import { UserModel } from "../db/User.ts";
import { List, ListModel } from "../db/List.ts";
import { isValidObjectId } from "mongoose";

export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!req.params.id) {
      throw new HttpError(400, "userId is required");
    }
    if (!name) {
      throw new HttpError(400, "name is required");
    }
    if (!isValidObjectId(req.params.id)) {
      throw new HttpError(400, "Invalid userId");
    }
    const user = await UserModel.findById(req.params.id)
      .populate("lists")
      .orFail(new HttpError(404, "user not found"));
    const existingList = user.lists.find((list) => {
      return (list as List).name === name && !(list as List).isDeleted;
    });
    if (existingList) {
      throw new HttpError(400, "List with this name already exists");
    }
    const newList = new ListModel({ name, user: user._id });
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
    if (!req.params.userId || !req.params.listIdOrName) {
      throw new HttpError(400, "userId and listIdOrName are required");
    }

    const isObjectId = isValidObjectId(req.params.listIdOrName);
    if (!isValidObjectId(req.params.userId)) {
      throw new HttpError(400, "Invalid userId or listIdOrName");
    }
    const user = await UserModel.findById(req.params.userId)
      .populate({
        path: "lists",
        match: {
          $or: [
            { _id: isObjectId ? req.params.listIdOrName : undefined },
            { name: req.params.listIdOrName },
          ],
          isDeleted: false,
        },
      })
      .orFail(new HttpError(404, "List not found for user"));

    if (!user.lists || user.lists.length === 0) {
      throw new HttpError(404, "user has no lists");
    }

    const list = user.lists[0] as List;
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
      const foundList = await ListModel.findById(list).orFail(
        new HttpError(404, "list not found, somehow")
      );
      if (!foundList.isDeleted) {
        lists.push(foundList);
      }
    }
    res.status(200).json(lists).end();
  } catch (e) {
    handleHttpError(e, res);
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    const { name, recipes } = req.body;

    if (!req.params.userId || !req.params.listIdOrName) {
      throw new HttpError(400, "userId and listIdOrName are required");
    }

    const isObjectId = isValidObjectId(req.params.listIdOrName);
    if (!isValidObjectId(req.params.userId)) {
      throw new HttpError(400, "Invalid userId or listIdOrName");
    }
    const user = await UserModel.findById(req.params.userId)
      .populate({
        path: "lists",
        match: {
          $or: [
            { _id: isObjectId ? req.params.listIdOrName : undefined },
            { name: req.params.listIdOrName },
          ],
          isDeleted: false,
        },
      })
      .orFail(new HttpError(404, "List not found for user"));

    if (!user.lists || user.lists.length === 0) {
      throw new HttpError(404, "user has no lists");
    }

    const list = user.lists[0] as List;

    if (name) {
      list.name = name;
    }
    if (recipes) {
      list.recipes = [...new Set(recipes)] as string[];
    }
    await ListModel.updateOne(
      { _id: list._id },
      { name: list.name, recipes: list.recipes }
    );

    res.status(200).json(list).end();
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
      list.isDeleted = true;
      list.deletedAt = new Date();
      await list.save();

      res.status(200).json({ message: "List successfully deleted" }).end();
    } else {
      res.status(403).end();
    }
  } catch (e) {
    handleHttpError(e, res);
  }
};
