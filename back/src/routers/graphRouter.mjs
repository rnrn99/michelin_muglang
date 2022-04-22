import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { Graph } from "../db";

const graphRouter = Router();

graphRouter.get(
  "/graph/:type",
  login_required,
  async function (req, res, next) {
    try {
      const type = req.params.type;
      const items = await Graph.findItems(type);
      res.status(200).send(items);
    } catch (error) {
      next(error);
    }
  },
);

export { graphRouter };
