import { Router } from "express";
import { graphItems } from "../db/index.mjs";

const graphRouter = Router();

graphRouter.get("/graphs/:type", async function (req, res, next) {
  try {
    const type = req.params.type;
    const items = await graphItems.find({ type }).toArray();

    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
});

export { graphRouter };
