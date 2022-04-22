import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: false,
    },
    maxPrice: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: false,
    },
    award: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RestaurantModel = model("Restaurant", RestaurantSchema);

export { RestaurantModel };
