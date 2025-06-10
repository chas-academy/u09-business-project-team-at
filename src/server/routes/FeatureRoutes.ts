import bodyParser from "body-parser";
import { Router } from "express";
import { createFeature, deleteFeature, listFeature, updateFeature, viewFeature } from "../controllers/FeatureController.ts";

export const featureRouter = Router();

featureRouter.post("/", bodyParser.json(), createFeature); //header, category, body, linktext?, ref?

featureRouter.get("/:featId", viewFeature);

featureRouter.get("/", listFeature);

featureRouter.patch("/:featId", bodyParser.json(), updateFeature); //header?, category?, body?, linktext?, ref?

featureRouter.delete("/featId", deleteFeature);