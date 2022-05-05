import { UserModel } from "../schemas/user.mjs";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser).lean();
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  }

  static async findById({ id }) {
    const user = await UserModel.findOne({ id }).lean();
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({}).lean();
    return users;
  }

  static async update({ id, toUpdate, session }) {
    const filter = { id };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedUser =
      session === undefined
        ? await UserModel.findOneAndUpdate(filter, update, option)
        : await UserModel.findOneAndUpdate(filter, update, option).session(
            session,
          );

    return updatedUser;
  }

  static async delete({ id, session }) {
    const ret = await UserModel.findOneAndDelete({ id }).session(session);
    return ret;
  }

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

  static async findBookmarks({ id }) {
    const userInfo = await UserModel.findOne({ id }).populate("bookmarks");
    return userInfo.bookmarks;
  }

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
