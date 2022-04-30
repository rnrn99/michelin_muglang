import { UserModel } from "../schemas/user.mjs";
import { RestaurantModel } from "../schemas/restaurant.mjs";
import { ReviewModel } from "../schemas/review.mjs";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ id }) {
    const user = await UserModel.findOne({ id }).lean();
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option,
    );

    // 유저 이름 수정 시, 리뷰 데이터도 업데이트
    if (toUpdate.name !== undefined) {
      const updatedReview = await ReviewModel.updateMany(
        { userId: id },
        { userName: toUpdate.name },
        option,
      );
      // console.log(updatedReview); // 업데이트 확인용
    }

    return updatedUser;
  }

  static async delete({ id }) {
    // 회원 탈퇴 시, 북마크한 것들을 다 취소하고자 함. (for문이 적절한 건지 잘 모르겠습니다)
    const userInfo = await UserModel.findOne({ id }).lean();
    for (let i = 0; i < userInfo.bookmarks.length; i++) {
      restaurantId = userInfo.bookmarks[i];
      const unbookmark = await RestaurantModel.findOneAndUpdate(
        { _id: restaurantId },
        { $inc: { bookmarkCount: -1 } },
        { returnOriginal: false },
      );
    }

    // 회원 탈퇴 시, 리뷰 데이터 삭제
    const deleteReviews = await ReviewModel.deleteMany({ userId: id });
    // console.log(deleteReviews); // 리뷰 삭제 확인용

    const ret = await UserModel.findOneAndDelete({ id });

    return ret;
  }

  // 북마크 관련 모델
  static updateBookmark = async ({ id, restaurantId }) => {
    const filter = { id };
    const update = { $push: { bookmarks: restaurantId } };
    const option = { returnOriginal: false };

    const bookmarks = await UserModel.findOneAndUpdate(filter, update, option);
    const bookmark = await RestaurantModel.findOneAndUpdate(
      { _id: restaurantId },
      { $inc: { bookmarkCount: 1 } },
      option,
    );
    // console.log(bookmark); // 레스토랑 다큐먼트 확인용
    return bookmarks;
  };

  static findBookmarks = async ({ id }) => {
    const bookmarks = await UserModel.findOne({ id }).populate("bookmarks");
    return bookmarks.bookmarks;
  };

  static deleteBookmark = async ({ id, restaurantId }) => {
    const filter = { id };
    const update = { $pull: { bookmarks: restaurantId } };
    const option = { returnOriginal: false };

    const bookmarks = await UserModel.findOneAndUpdate(filter, update, option);
    const unbookmark = await RestaurantModel.findOneAndUpdate(
      { _id: restaurantId },
      { $inc: { bookmarkCount: -1 } },
      option,
    );
    // console.log(unbookmark); // 레스토랑 다큐먼트 확인용
    return bookmarks;
  };
}

export { User };
