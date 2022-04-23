import { Restaurant, Currency } from "../db/index.mjs";

class restaurantService {
  static async getRestaurants() {
    const restaurants = await Restaurant.findAll();
    return restaurants;
  }

  static async getRestaurantInfo({ restaurant_id }) {
    const restaurant = await Restaurant.findById({ restaurant_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!restaurant) {
      const errorMessage = "해당 레스토랑은 존재하지 않습니다.";
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

  static async getConvertedPrice({ restaurant_id, currency }) {
    const restaurant = await getRestaurantInfo({ restaurant_id });
    const [minPrice, maxPrice, currentCurrency] = [
      restaurant.minPrice,
      restaurant.maxPrice,
      restaurant.currency,
    ];

    // 가격 정보를 제공하지 않는 식당의 경우, 에러 메시지 반환
    if (!minPrice) {
      const errorMessage = "해당 레스토랑은 가격 정보를 제공하지 않습니다.";
      return { errorMessage };
    }

    const targetCurrency = await Currency.findByCode({ currency });

    // db에서 해당 통화를 찾지 못한 경우, 에러 메시지 반환
    if (!targetCurrency) {
      const errorMessage = "해당 통화에 대한 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    if (currentCurrency == targetCurrency) {
      return { minPrice, maxPrice };
    }

    let convertedMinPrice, convertedMaxPrice;
    if (currentCurrency == "EUR") {
      convertedMinPrice = minPrice * targetCurrency.value;
      convertedMaxPrice = maxPrice * targetCurrency.value;
    } else {
      const ratio = targetCurrency.value / currentCurrency.value;
      convertedMinPrice = minPrice * ratio;
      convertedMaxPrice = maxPrice * ratio;
    }

    return { minPrice: convertedMinPrice, maxPrice: convertedMaxPrice };
  }
}

export { restaurantService };
