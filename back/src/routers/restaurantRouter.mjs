import { Router } from "express";
import { restaurantService } from "../services/restaurantService.mjs";

const restaurantRouter = Router();

// Path: /restaurants
restaurantRouter.get("/restaurants", async function (req, res, next) {
  // 특정 국가에 있는 식당들의 정보를 얻음
  if (req.query.country) {
    try {
      // URI로부터 country(query)를 추출함
      const country = req.query.country;
      const restaurants = await restaurantService.getRestaurantsByCountry({
        country,
      });

      if (restaurants.errorMessage) {
        throw new Error(restaurants.errorMessage);
      }

      res.status(200).send(restaurants);
      return;
    } catch (error) {
      next(error);
    }
  }

  // 전체 식당의 목록을 얻음
  try {
    const restaurants = await restaurantService.getRestaurants();
    res.status(200).send(restaurants);
  } catch (error) {
    next(error);
  }
});

// Path: /restaurants/:id
restaurantRouter.get("/restaurants/:id", async function (req, res, next) {
  // 특정 식당의 가격에 대한 환전 결과를 얻음
  if (req.query.currency) {
    try {
      // URI로부터 restaurant_id(params)와 currency(query)를 추출함
      const id = req.params.id;
      const currencyCode = req.query.currency;

      // currency exchange된 minPrice와 maxPrice를 얻음
      const prices = await restaurantService.getConvertedPrice({
        id,
        currencyCode,
      });

      if (prices.errorMessage) {
        throw new Error(prices.errorMessage);
      }

      res.status(200).send(prices);
      return;
    } catch (error) {
      next(error);
    }
  }

  // 특정 식당의 정보를 얻음
  try {
    // URI로부터 restaurant_id를 추출함
    const id = req.params.id;
    const restaurant = await restaurantService.getRestaurantInfo({ id });

    if (restaurant.errorMessage) {
      throw new Error(restaurant.errorMessage);
    }

    res.status(200).send(restaurant);
  } catch (error) {
    next(error);
  }
});

export { restaurantRouter };
