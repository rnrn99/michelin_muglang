import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { Graph } from "../db";
import { graphService } from "../services/graphService";

const graphRouter = Router();

graphRouter.get(
  "/covidMonthlyGraph",
  login_required,
  async function (req, res, next) {
    try {
      const covidMonthly = await Graph.findCovidMonthly();
      res.status(200).send(covidMonthly);
    } catch (error) {
      next(error);
    }
  },
);

export { graphRouter };
