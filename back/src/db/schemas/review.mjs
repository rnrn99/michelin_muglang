import pkg from "mongoose";
const { Schema, model } = pkg;

const ReviewSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ReviewModel = model("Review", ReviewSchema);

export { ReviewModel };
