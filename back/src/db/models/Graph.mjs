import { db } from "../index.mjs";

class Graph {
  static findItems = async (type) => {
    const items = await db.collection("graphItems").find({ type }).toArray();
    return items;
  };
}

export { Graph };
