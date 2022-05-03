import mongoose from "mongoose";
import { User } from "./models/User.mjs";
import { Restaurant } from "./models/Restaurant.mjs";
import { Currency } from "./models/Currency.mjs";
import { Country } from "./models/Country.mjs";
import { Review } from "./models/Review.mjs";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;
const mongodb = mongoose.createConnection(DB_URL); // for db transaction
const graphItems = db.collection("graphItems"); // for graph visualization

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL),
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
);

export { mongodb };
export { graphItems };
export { User };
export { Restaurant };
export { Currency };
export { Country };
export { Review };
