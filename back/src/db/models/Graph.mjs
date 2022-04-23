import pkg from "mongoose";
import { db } from "../index.mjs";
const { Schema, model } = pkg;

// const graphModel = model("graphitem", new Schema());
// const graphModel = model("graphitem");

class Graph {
  static findItems = async (type) => {
    const items = await db.collection("graphItems").find({ type }).toArray();
    // .forEach((element) => items.push(element));
    return items;
  };
}

export { Graph };
