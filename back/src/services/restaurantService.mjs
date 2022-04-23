import { Restaurant } from "../db/index.mjs";

class restaurantService {
  static async getRestaurants() {
    const restaurants = await Restaurant.findAll();
    return restaurants;
  }

  static async getRestaurantInfo({ restaurant_id }) {
    const restaurant = await Restaurant.findById({ restaurant_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!restaurant) {
      const errorMessage = "해당 식당은 존재하지 않습니다.";
      return { errorMessage };
    }

    return restaurant;
  }

  static async getRestaurantsByCountry({ restaurantCountry }) {
    const restaurants = await Restaurant.findAllByCountry({
      country: restaurantCountry,
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!restaurants) {
      const errorMessage = "해당 국가에 식당이 존재하지 않습니다.";
      return { errorMessage };
    }

    return restaurants;
  }
}

export { restaurantService };
