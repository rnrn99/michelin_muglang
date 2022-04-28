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
    const restaurants = await RestaurantModel.find({ country }).lean();
    return restaurants;
  }

  static async findAll() {
    const restaurants = await RestaurantModel.find({});
    return restaurants;
  }

  static async countByCountry(country) {
    const ret = await RestaurantModel.countDocuments({ country });
    return ret;
  }

  static async findAllByCountryPaging({ page, pageSize, country }) {
    try {
      const restaurants = await RestaurantModel.find({ country })
        .sort({ _id: 1 })
        .skip(page * pageSize)
        .limit(pageSize)
        .lean();

      const len = await RestaurantModel.countDocuments({ country });
      restaurants.lastPage = Math.ceil(len / pageSize) - 1;
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
}

export { Restaurant };
