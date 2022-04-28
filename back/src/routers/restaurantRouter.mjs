import { Router } from "express";
import { restaurantService } from "../services/restaurantService.mjs";

const restaurantRouter = Router();

// 전체 식당의 목록을 얻음
restaurantRouter.get("/restaurants", async function (req, res, next) {
  try {
    const restaurants = await restaurantService.getRestaurants();
    res.status(200).send(restaurants);
  } catch (error) {
    next(error);
  }
});

// 특정 식당의 정보를 얻음
restaurantRouter.get("/restaurants/:id", async function (req, res, next) {
  try {
    // URI로부터 restaurant_id를 추출함
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

// 특정 국가에 있는 식당들의 정보를 얻음
restaurantRouter.get(
  "/restaurants/by/:country",
  async function (req, res, next) {
    try {
      // URI로부터 국가 이름을 추출함
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
      // URI로부터 restaurant_id와 currency를 추출함
      const restaurant_id = req.params.id;
      const currencyName = req.params.currencyName;

      // currency exchange된 minPrice와 maxPrice를 얻음
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
