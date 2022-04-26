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

  static async findById({ id }) {
    const restaurant = await RestaurantModel.findOne({ _id: id });
    return restaurant;
  }

  static async findAllByCountry({ country }) {
    const restaurants = await RestaurantModel.find({ country });
    return restaurants;
  }
}

export { Restaurant };
