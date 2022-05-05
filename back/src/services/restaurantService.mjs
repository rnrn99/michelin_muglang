import { Restaurant, Currency } from "../db/index.mjs";

class RestaurantService {
  static async getRestaurants() {
    const restaurants = await Restaurant.findAll();

    // 레스토랑 정보를 가져오는 데 실패한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error("레스토랑 데이터를 가져오는 데 실패하였습니다.");
      error.statusCode = 500;
      throw error;
    }

    return restaurants;
  }

  static async getRestaurantsPaging({ page, pageSize }) {
    const restaurants = await Restaurant.findAllPaging({ page, pageSize });

    // 페이징 과정 중 실패한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error("레스토랑 데이터를 가져오는 데 실패하였습니다.");
      error.statusCode = 500;
      throw error;
    }

    return restaurants;
  }

  static async getRestaurantInfo({ id }) {
    const restaurant = await Restaurant.findById({ id });

    // db에서 해당 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurant).length === 0) {
      const error = new Error("해당 레스토랑은 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    return restaurant;
  }

  static async getRestaurantsByCountry({ country }) {
    const restaurants = await Restaurant.findAllByCountry({ country });

    // db에서 해당 국가에 존재하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error("해당 국가에 식당이 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    return restaurants;
  }

  static async getRestaurantsByCountryPaging({ page, pageSize, country }) {
    const restaurants = await Restaurant.findAllByCountryPaging({
      page,
      pageSize,
      country,
    });

    // db에서 해당 국가에 존재하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error("해당 국가에 식당이 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    return restaurants;
  }

  static async getRestaurantsByCuisinePaging({ page, pageSize, cuisine }) {
    const restaurants = await Restaurant.findAllByCuisinePaging({
      page,
      pageSize,
      cuisine,
    });

    // db에서 해당 국가에 존재하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error(
        "해당 음식 카테고리로 분류되는 식당이 존재하지 않습니다.",
      );
      error.statusCode = 400;
      throw error;
    }

    return restaurants;
  }

  static async getRestaruantsByQuery({
    page,
    pageSize,
    name,
    address,
    location,
    minPrice,
    maxPrice,
    cuisine,
    award,
    country,
  }) {
    const restaurants = await Restaurant.findAllByQuery({
      page,
      pageSize,
      name,
      address,
      location,
      minPrice,
      maxPrice,
      cuisine,
      award,
      country,
    });

    // db에서 해당 검색어를 포함하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurants).length === 0) {
      const error = new Error("검색 결과가 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    return restaurants;
  }

  static async getConvertedPrice({ id, currencyCode }) {
    const restaurant = await Restaurant.findById({ id });

    // db에서 해당 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurant).length === 0) {
      const error = new Error("해당 레스토랑은 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    // 현재 식당의 최고가, 최저가, 통화를 확인
    const { minPrice, maxPrice, currency: currentCurrencyCode } = restaurant;

    // 가격 정보를 제공하지 않는 식당의 경우, 에러 메시지 반환
    if (!minPrice) {
      const error = new Error("해당 레스토랑은 가격 정보를 제공하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    const targetCurrency = await Currency.findByCode({ code: currencyCode });
    const currentCurrency = await Currency.findByCode({
      code: currentCurrencyCode,
    });

    // db에서 해당 통화를 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(targetCurrency).length === 0) {
      const error = new Error("해당 통화에 대한 정보가 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    if (Object.keys(currentCurrency).length === 0) {
      const error = new Error("통화에 대한 정보를 가져오는 데 실패하였습니다.");
      error.statusCode = 500;
      throw error;
    }

    const name = targetCurrency.name;
    const date = targetCurrency.date;
    // 현재 통화와 타켓 통화가 일치할 경우 기존 값을 반환
    if (currentCurrency.code === targetCurrency.code) {
      return { name, date, minPrice, maxPrice };
    }

    let convertedMinPrice, convertedMaxPrice;

    // exchange_rates가 EUR를 기준으로 value값이 설정 되어 있으므로 타겟 통화의 value로 계산
    if (currentCurrency.code === "EUR") {
      convertedMinPrice = minPrice * targetCurrency.value;
      convertedMaxPrice = maxPrice * targetCurrency.value;
    } else {
      // EUR를 기준으로 비율 계산 (타겟 통화 value / 현재 통화 value)
      const ratio = targetCurrency.value / currentCurrency.value;
      convertedMinPrice = minPrice * ratio;
      convertedMaxPrice = maxPrice * ratio;
    }

    return {
      name,
      date,
      minPrice: convertedMinPrice,
      maxPrice: convertedMaxPrice,
    };
  }

  static async getRestaurantsNear({ id }) {
    // 해당 식당에서 가까운 식당들 확인
    const restaurantsNear = await Restaurant.findRestaurantsNearById({ id });

    // db에서 가까운 식당을 찾지 못한 경우, 에러 메시지 반환
    if (Object.keys(restaurantsNear).length === 0) {
      const error = new Error("가까운 레스토랑이 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    return restaurantsNear;
  }
}

export { RestaurantService };
