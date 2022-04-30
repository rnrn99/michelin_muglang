import pkg from "mongoose";
const { Schema, model } = pkg;

const CommentSchema = new Schema(
  {
    reviewId: {
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
    mentionName: {
      type: String,
      required: false,
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

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
