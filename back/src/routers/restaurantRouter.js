import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { restaurantService } from "../services/restaurantService";

const restaurantRouter = Router();

restaurantRouter.get("/restaurants", async function (req, res, next) {
  try {
    // 전체 식당 목록을 얻음
    const restaurants = await restaurantService.getRestaurants();
    res.status(200).send(restaurants);
  } catch (error) {
    next(error);
  }
});

restaurantRouter.get("/restaurants/:id", async function (req, res, next) {
  try {
    const restaurant_id = req.params.id;
    const restaurantInfo = await restaurantService.getRestaurantInfo({
      restaurant_id,
    });

    if (restaurantInfo.errorMessage) {
      throw new Error(restaurantInfo.errorMessage);
    }

    res.status(200).send(restaurantInfo);
  } catch (error) {
    next(error);
  }
});

export { restaurantRouter };
