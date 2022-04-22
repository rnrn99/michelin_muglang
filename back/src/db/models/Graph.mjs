import { Schema, model } from "mongoose";

const graphModel = model("graphitem", new Schema());

class Graph {
  static findItems = async (type) => {
    const items = await graphModel.find({
      type,
    });
    return items;
  };
}

export { Graph };
