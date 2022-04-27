import pkg from "mongoose";
const { Schema, model } = pkg;

const CurrencySchema = new Schema(
  {
    currency: {
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
  },
  {
    timestamps: true,
  },
);

const CurrencyModel = model("Currency", CurrencySchema);

export { CurrencyModel };
