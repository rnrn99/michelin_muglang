import React from "react";
import Slider from "./Slider";
import styles from "../../../css/user/MyReview.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const mock = [
  {
    _id: "62679eec3a7068cefcd2ba79",
    id: "11de3c48-5ab3-4706-b4fd-90535755940c",
    restaurantId: "626370999dcb2f0f3041e88b",
    userId: "3b6aebe0-ca55-47e7-9cda-523f28b3aafc",
    restaurantName: "Aqua",
    userName: "엘리스",
    text: "코로나가 끝나면 여기 가보고 싶어요!",
    createdAt: "2022-04-22T07:27:40.431Z",
    updatedAt: "2022-04-26T07:55:25.040Z",
    __v: 0,
  },
  {
    _id: "6267a8becec0b1eafed34e7e",
    id: "06354643-c6f6-42cd-af75-0952f0843f81",
    restaurantId: "626370999dcb2f0f3041e88c",
    userId: "3b6aebe0-ca55-47e7-9cda-523f28b3aafc",
    restaurantName:
      "No. 69 Fangzhuanchang Zhajiangmian (Fangzhuanchang Hutong)",
    userName: "토끼",
    text: "여기 가보고 싶어요!",
    createdAt: "2022-04-23T08:09:34.651Z",
    updatedAt: "2022-04-26T08:09:34.651Z",
    __v: 0,
  },
  {
    _id: "6267a8becec0b1eafed34e7a",
    id: "06354643-c6f6-42cd-af75-0952f0843f8a",
    restaurantId: "626370999dcb2f0f3041e88a",
    userId: "3b6aebe0-ca55-47e7-9cda-523f28b3aafa",
    restaurantName:
      "L'Auberge de St-Rémy-de-Provence - Fanny Rey & Jonathan Wahid",
    userName: "김뚜떼",
    text: "대충 아주아주 긴 리뷰입니다. 글씨를 더 써야해요. 길어요. 대충 아주아주 긴 리뷰입니다. 글씨를 더 써야해요. 길어요. 대충 아주아주 긴 리뷰입니다. 글씨를 더 써야해요. 길어요.",
    createdAt: "2022-04-25T08:09:34.651Z",
    updatedAt: "2022-04-26T08:09:34.651Z",
    __v: 0,
  },
  {
    _id: "6267a8becec0b1eafed34e7b",
    id: "06354643-c6f6-42cd-af75-0952f0843f8b",
    restaurantId: "626370999dcb2f0f3041e88b",
    userId: "3b6aebe0-ca55-47e7-9cda-523f28b3aafb",
    restaurantName: "Fried Banana Rama 5",
    userName: "나는누구",
    text: "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..! 대충 아주아주 긴 리뷰입니다. 글씨를 더 써야해요. 길어요.",
    createdAt: "2022-04-26T08:09:34.651Z",
    updatedAt: "2022-04-26T08:09:34.651Z",
    __v: 0,
  },
];

const MyBookmark = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 리뷰</div>
      <Slider contentLength={mock.length}>
        {mock.map((review) => (
          <div className={styles.review}>
            <div className={styles.review_date}>
              {review.createdAt.slice(0, 10)}
            </div>
            <div className={styles.restaurant_name}>
              {review.restaurantName}
            </div>
            <div className={styles.review_text}>
              {review.text.length < 65
                ? review.text
                : `${review.text.slice(0, 65)}..`}
            </div>
            <div className={styles.icon_delete}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyBookmark;
