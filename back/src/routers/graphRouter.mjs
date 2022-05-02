import { Router } from "express";
import { Graph } from "../db/index.mjs";

const graphRouter = Router();

graphRouter.get("/graphs/:type", async function (req, res, next) {
  try {
    const type = req.params.type;
    const items = await Graph.findItems({ type });
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
});

export { graphRouter };
