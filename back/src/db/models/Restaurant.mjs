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
    const restaurant = await RestaurantModel.findOne({ name }).lean();
    return restaurant;
  }

  static async findById({ id }) {
    const restaurant = await RestaurantModel.findOne({ _id: id }).lean();
    return restaurant;
  }

  static async findAllByCountry({ country }) {
    const restaurants = await RestaurantModel.find({ country }).lean();
    return restaurants;
  }

  static async findAll() {
    const restaurants = await RestaurantModel.find({}).lean();
    return restaurants;
  }

  static async countByCountry(country) {
    const ret = await RestaurantModel.countDocuments({ country });
    return ret;
  }

  static async findAllByCountryPaging({ page, pageSize, country }) {
    const len = await RestaurantModel.countDocuments({ country });
    const lastPage = Math.ceil(len / pageSize);

    const restaurants = await RestaurantModel.find({ country })
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return { restaurants, lastPage, len };
  }

  static async findAllPaging({ page, pageSize }) {
    const len = await RestaurantModel.countDocuments({});
    const lastPage = Math.ceil(len / pageSize);

    const restaurants = await RestaurantModel.find({})
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return { restaurants, lastPage, len };
  }

  static async findAllByCuisinePaging({ page, pageSize, cuisine }) {
    const len = await RestaurantModel.countDocuments({ cuisine });
    const lastPage = Math.ceil(len / pageSize);

    const restaurants = await RestaurantModel.find({
      cuisine,
    })
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return { restaurants, lastPage, len };
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
    const len = await RestaurantModel.countDocuments({
      name: { $regex: name, $options: "i" },
      address: { $regex: address, $options: "i" },
      location: { $regex: location, $options: "i" },
      minPrice: { $gte: parseInt(minPrice) },
      maxPrice: { $lte: parseInt(maxPrice) },
      cuisine: { $regex: cuisine, $options: "i" },
      award: { $regex: award, $options: "i" },
    });

    const lastPage = Math.ceil(len / pageSize);

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
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return { restaurants, lastPage, len };
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
          maxDistance: 30000, // 최대 거리를 30km로 제한(개수 제한 방법..임시)
          distanceField: "distance", // 미터(m) 단위로 표현,
          distanceMultiplier: 0.001, // m => km로 변환
        },
      },
    ]);

    return restaurantsNear;
  }

  static bookmark = async ({ id }) => {
    const filter = { _id: id };
    const update = { $inc: { bookmarkCount: 1 } };
    const option = { returnOriginal: false };

    const bookmark = await RestaurantModel.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return bookmark;
  };

  static unbookmark = async ({ id }) => {
    const filter = { _id: id };
    const update = { $inc: { bookmarkCount: -1 } };
    const option = { returnOriginal: false };

    const bookmark = await RestaurantModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return bookmark;
  };

  static unbookmarkByList = async ({ bookmarkList }) => {
    // for (let i = 0; i < userInfo.bookmarks.length; i++) {
    //   restaurantId = userInfo.bookmarks[i];
    //   const unbookmark = await RestaurantModel.findOneAndUpdate(
    //     { _id: restaurantId },
    //     { $inc: { bookmarkCount: -1 } },
    //     { returnOriginal: false },
    //   );
    // }

    const filter = { _id: { $in: bookmarkList } };
    const update = { $inc: { bookmarkCount: -1 } };
    const option = { returnOriginal: false };

    const unbookmark = await RestaurantModel.updateMany(filter, update, option);

    return unbookmark;
  };
}

export { Restaurant };
