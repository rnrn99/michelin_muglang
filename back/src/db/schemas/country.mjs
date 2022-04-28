import pkg from "mongoose";
const { Schema, model } = pkg;

const CountrySchema = new Schema(
  {
    nation: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CountryModel = model("Country", CountrySchema);

export { CountryModel };
