import bodyParser from "body-parser";
import { Router } from "express";
import { authorize } from "../middleware/auth.ts";
import {
  createList,
  deleteList,
  listList,
  updateList,
  viewList,
} from "../controllers/ListController.ts";

export const listRouter = Router();

//id param always refers to USER ID!
listRouter.post("/:id", bodyParser.json(), authorize, createList); //name, desc?

listRouter.get("/:id", listList);

listRouter.get("/:listId", viewList);

listRouter.patch("/:id/:listId", bodyParser.json(), authorize, updateList); //name?, desc?, recipes?

listRouter.delete("/:id/:listId", authorize, deleteList);
