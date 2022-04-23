import { Router } from "express";
import { restaurantService } from "../services/restaurantService.mjs";

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

restaurantRouter.get(
  "/restaurants/by/:country",
  async function (req, res, next) {
    try {
      const restaurantCountry = req.params.country;
      const restaurantsInfo = await restaurantService.getRestaurantsByCountry({
        restaurantCountry,
      });

      if (restaurantsInfo.errorMessage) {
        throw new Error(restaurantsInfo.errorMessage);
      }

      res.status(200).send(restaurantsInfo);
    } catch (error) {
      next(error);
    }
  },
);

restaurantRouter.get(
  "/restaurants/:id/:currencyName",
  async function (req, res, next) {
    try {
      const restaurant_id = req.params.id;
      const currencyName = req.params.currencyName;
      const prices = await restaurantService.getConvertedPrice({
        restaurant_id,
        currencyName,
      });

      if (prices.errorMessage) {
        throw new Error(prices.errorMessage);
      }

      res.status(200).send(prices);
    } catch (error) {
      next(error);
    }
  },
);

export { restaurantRouter };
