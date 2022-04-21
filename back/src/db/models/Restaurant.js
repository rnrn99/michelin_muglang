import { RestaurantModel } from "../schemas/restaurant";

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

  static async findAll() {
    const restaurants = await RestaurantModel.find({});
    return restaurants;
  }
}

export { Restaurant };