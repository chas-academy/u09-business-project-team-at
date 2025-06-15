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
listRouter.post("/:id", bodyParser.json(), authorize, createList); //name

listRouter.get("/:id", listList);

listRouter.get("/list/:listIdOrName", authorize, viewList);

listRouter.patch(
  "/:id/:listIdOrName",
  authorize,
  bodyParser.json(),
  updateList
); //name?, desc?, recipes?

listRouter.delete("/:id/:listId", authorize, deleteList);
