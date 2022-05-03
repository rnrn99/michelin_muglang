import { UserModel } from "../schemas/user.mjs";

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

    return updatedUser;
  }

  static async delete({ id, session }) {
    const ret = await UserModel.findOneAndDelete({ id }).session(session);
    return ret;
  }

  // 북마크: 유저의 북마크 리스트에 업데이트
  static async updateBookmark({ id, restaurantId, session }) {
    const filter = { id };
    const update = { $push: { bookmarks: restaurantId } };
    const option = { returnOriginal: false };

    const bookmarks = await UserModel.findOneAndUpdate(
      filter,
      update,
      option,
    ).session(session);
    return bookmarks;
  }

  // 유저의 북마크 리스트 가져오기
  static async findBookmarks({ id }) {
    const userInfo = await UserModel.findOne({ id }).populate("bookmarks");
    return userInfo.bookmarks;
  }

  // 북마크 취소: 유저의 북마크 리스트에서 삭제
  static async deleteBookmark({ id, restaurantId, session }) {
    const filter = { id };
    const update = { $pull: { bookmarks: restaurantId } };
    const option = { returnOriginal: false };

    const bookmarks = await UserModel.findOneAndUpdate(
      filter,
      update,
      option,
    ).session(session);
    return bookmarks;
  }
}

export { User };
