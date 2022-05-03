import pkg from "mongoose";
const { Schema, model } = pkg;

const CurrencySchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CurrencyModel = model("Currency", CurrencySchema);

export { CurrencyModel };
