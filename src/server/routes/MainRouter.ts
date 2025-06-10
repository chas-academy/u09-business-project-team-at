import { Router } from "express";
import { userRouter } from "./UserRoutes.ts";
import { listRouter } from "./ListRoutes.ts";
import { featureRouter } from "./FeatureRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/list", listRouter);
mainRouter.use("/feature", featureRouter);