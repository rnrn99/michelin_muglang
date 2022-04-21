import { Schema, model } from "mongoose";

const graphModel = model("graphitem", new Schema());

class Graph {
  static findCovidMonthly = async () => {
    const covidMonthly = await graphModel.find({
      type: "covid_monthly",
    });
    return covidMonthly;
  };
}

export { Graph };
