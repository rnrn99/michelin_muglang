import { RestaurantModel } from "../schemas/restaurant.mjs";

class Restaurant {
  static async create({ newRestaurant }) {
    const createdNewRestaurant = await RestaurantModel.create(newRestaurant);
    return createdNewRestaurant;
  }

  static async findByName({ name }) {
    const restaurant = await RestaurantModel.findOne({ name });
    return restaurant;
  }

  static async findById({ restaurant_id }) {
    const restaurant = await RestaurantModel.findOne({ _id: restaurant_id });
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

  static async count(query) {
    const ret = await RestaurantModel.countDocuments(query);
    return ret;
  }
}

export { Restaurant };
