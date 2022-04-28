import { RestaurantModel } from "../schemas/restaurant.mjs";

class Restaurant {
  static async create({
    name,
    address,
    location,
    minPrice,
    maxPrice,
    currency,
    cuisine,
    longitude,
    latitude,
    phoneNumber,
    url,
    websiteUrl,
    award,
    country,
  }) {
    const createdNewRestaurant = await RestaurantModel.create({
      name,
      address,
      location,
      minPrice,
      maxPrice,
      currency,
      cuisine,
      longitude,
      latitude,
      phoneNumber,
      url,
      websiteUrl,
      award,
      country,
    });
    return createdNewRestaurant;
  }

  static async findByName({ name }) {
    const restaurant = await RestaurantModel.findOne({ name });
    return restaurant;
  }

  static async findById({ id }) {
    const restaurant = await RestaurantModel.findOne({ _id: id });
    return restaurant;
  }

  static async findAllByCountry({ country }) {
    const restaurants = await RestaurantModel.find({ country });
    return restaurants;
  }

  static async findAll() {
    const restaurants = await RestaurantModel.find({});
    return restaurants;
  }

  static async findAllByCountryPaging({ page, pageSize, country }) {
    try {
      const restaurants = await RestaurantModel.find({ country })
        .sort({ _id: 1 })
        .skip(page * pageSize)
        .limit(pageSize);
      return restaurants;
    } catch (error) {
      return error;
    }
  }

  static async findAllPaging({ page, pageSize }) {
    try {
      const restaurants = await RestaurantModel.find({})
        .sort({ _id: 1 })
        .skip(page * pageSize)
        .limit(pageSize);
      return restaurants;
    } catch (error) {
      return error;
    }
  }

  static async findAllByCuisinePaging({ page, pageSize, cuisine }) {
    try {
      const restaurants = await RestaurantModel.find({
        cuisine,
      })
        .sort({ _id: 1 })
        .skip(page * pageSize)
        .limit(pageSize);
      return restaurants;
    } catch (error) {
      return error;
    }
  }

  static async findAllByQuery({
    page,
    pageSize,
    name = "",
    address = "",
    location = "",
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    cuisine = "",
    award = "",
  }) {
    try {
      const restaurants = await RestaurantModel.find({
        name: { $regex: name, $options: "i" },
        address: { $regex: address, $options: "i" },
        location: { $regex: location, $options: "i" },
        minPrice: { $gte: parseInt(minPrice) },
        maxPrice: { $lte: parseInt(maxPrice) },
        cuisine: { $regex: cuisine, $options: "i" },
        award: { $regex: award, $options: "i" },
      })
        .sort({ _id: 1 })
        .skip(page * pageSize)
        .limit(pageSize);
      return restaurants;
    } catch (error) {
      return error;
    }
  }

  static async findRestaurantsNearById({ id }) {
    const targetRestaurant = await RestaurantModel.findOne({ _id: id });

    const restaurantsNear = await RestaurantModel.aggregate([
      {
        $geoNear: {
          spherical: true,
          $limit: 5, // 효과는 없는듯하다..(기본값으로 100개 받음)
          near: {
            type: "Point",
            coordinates: [
              parseFloat(targetRestaurant.longitude),
              parseFloat(targetRestaurant.latitude),
            ],
          },
          query: { country: targetRestaurant.country },
          maxDistance: 3000, // 최대 거리를 100km로 제한(개수 제한 방법..임시)
          distanceField: "distance", // 미터(m) 단위로 표현,
          distanceMultiplier: 0.001, // m => km로 변환
        },
      },
    ]);

    return restaurantsNear;
  }
}

export { Restaurant };
