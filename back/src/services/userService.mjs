import { User } from "../db/index.mjs"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;

    const loginUser = {
      token,
      id,
      email,
      name,
      errorMessage: null,
    };

    return loginUser;
  }

  static async setUser({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.password) {
      // 비밀번호 해쉬화
      const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
      toUpdate.password = hashedPassword;
    }

    // email 중복 확인
    if (toUpdate.email) {
      if (toUpdate.email && user.email !== toUpdate.email) {
        //이메일 변경됨
        let isDup = await User.findByEmail({ email: toUpdate.email });
        if (isDup) {
          const errorMessage =
            "사용중인 이메일 입니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
        }
      }
    }

    user = await User.update({ id, toUpdate });

    return user;
  }

  static async getUserInfo({ id }) {
    const user = await User.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    delete user.password;

    return user;
  }

  //추후에 북마크 리뷰 기능도 있으면 해당 데이터도 같이 지워주기
  static async deleteUser({ id }) {
    const user = await User.delete({ id });
    return user;
  }

  // 북마크 관련 모델
  static updateBookmark = async ({ id, restaurantId }) => {
    const bookmarks = await User.updateBookmark({ id, restaurantId });
    return bookmarks;
  };

  static getBookmarks = async ({ id }) => {
    const bookmarkInfo = await User.findById({ id });
    if (!bookmarkInfo) {
      const error = new Error("해당 id를 가진 사용자를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const bookmarks = await User.findBookmarks({ id });
    return bookmarks;
  };

  static deleteBookmark = async ({ id, restaurantId }) => {
    const bookmarks = await User.deleteBookmark({ id, restaurantId });
    return bookmarks;
  };
}

export { userAuthService };
