import { User, Restaurant, Review, Comment } from "../db/index.mjs";
import { runTransaction } from "../utils/runTransaction.mjs";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import axios from "axios";
import "dotenv/config";

class UserAuthService {
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

  static async upsertKakaoUser({ code }) {
    const KAKAO_CLIENT_id = process.env.KAKAO_CLIENT_id;
    const KAKAO_REDIRECT_URL = "http://localhost:5000/users/login/kakao";
    //카카오 토큰 받기
    const ret = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_id}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
    );

    const kakaoToken = ret.data.access_token;

    //카카오 유저정보 받기
    const kakaoData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: { Authorization: `Bearer ${kakaoToken}` },
    });

    const userData = {
      id: kakaoData.data.id,
      email: kakaoData.data.kakao_account.email || "이메일 동의 안함",
      name: kakaoData.data.kakao_account.profile.nickname,
      password: "kakao",
    };
    let user;
    const isUserExist = await User.findById({ id: userData.id });
    if (isUserExist) {
      //최초 로그인 아님, 디비 기존 정보 업데이트
      user = await User.update({ id: userData.id, toUpdate: userData });
    } else {
      //최초 로그인, 디비에 새로 생성
      user = await User.create({ newUser: userData });
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ id: user.id }, secretKey);

    const loginUser = {
      token,
      id: user.id,
      email: user.email,
      name: user.name,
      errorMessage: null,
    };

    return loginUser;
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

    if (toUpdate.name && user.name !== toUpdate.name) {
      // 유저 이름 변경 시, 리뷰와 댓글의 작성자 이름도 변경
      async function txnFunc(session) {
        const updatedUser = [
          await User.update({ id, toUpdate, session }),
          await Review.updateUserName({
            userId: id,
            userName: toUpdate.name,
            session,
          }),
          await Comment.updateUserName({
            userId: id,
            userName: toUpdate.name,
            session,
          }),
        ];

        return updatedUser[0];
      }

      // 모든 업데이트 성공시 최종적으로 db에 업데이트
      const user = await runTransaction(txnFunc);
      return user;
    } else {
      user = await User.update({ id, toUpdate });
      return user;
    }
  }

  static async getUserInfo({ id }) {
    const user = await User.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const { password, ...rest } = user;

    return rest;
  }

  static async getUserByEmail({ email }) {
    const user = await User.findByEmail({ email });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error(
        "해당 가입 내역이 없습니다. 다시 한 번 확인해 주세요.",
      );
      error.statusCode = 400;
      throw error;
    }

    const { password, ...rest } = user;

    return rest;
  }

  static async deleteUser({ id }) {
    async function txnFunc(session) {
      const userInfo = await User.findById({ id });
      const commentList = await Comment.findByUserId({ userId: id });
      const deletedUser = [
        await Restaurant.unbookmarkByList({
          bookmarkList: userInfo.bookmarks,
          session,
        }), // 유저의 북마크 리스트 삭제 및 레스토랑 북마크 개수 -1
        await Review.deleteByUserId({ userId: id, commentList, session }), // 유저의 리뷰 내역 삭제
        await Comment.deleteByUserId({ userId: id, session }), // 유저의 댓글 내역 삭제
        await User.delete({ id, session }),
      ];

      return deletedUser[3];
    }

    // 모든 데이터 삭제 성공시 최종적으로 db에서 삭제
    const user = await runTransaction(txnFunc);
    return user;
  }

  static async updateBookmark({ id, restaurantId }) {
    async function txnFunc(session) {
      const bookmarks = [
        await Restaurant.bookmark({ id: restaurantId, session }), // 음식점의 북마크 개수 +1
        await User.updateBookmark({ id, restaurantId, session }), // 유저의 북마크 리스트에 업데이트
      ];

      return bookmarks[0];
    }

    // 모든 업데이트 성공시 최종적으로 db에 업데이트
    const bookmarks = await runTransaction(txnFunc);
    return bookmarks;
  }

  static async deleteBookmark({ id, restaurantId }) {
    async function txnFunc(session) {
      const bookmarks = [
        await Restaurant.unbookmark({ id: restaurantId, session }), // 음식점의 북마크 개수 -1
        await User.deleteBookmark({ id, restaurantId, session }), // 유저의 북마크 리스트에서 삭제
      ];

      return bookmarks[0];
    }

    // 모든 업데이트 성공시 최종적으로 db에 업데이트
    const bookmarks = await runTransaction(txnFunc);
    return bookmarks;
  }

  static async getBookmarks({ id }) {
    const bookmarkInfo = await User.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!bookmarkInfo) {
      const error = new Error("해당 id를 가진 사용자를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    // 유저의 북마크 리스트 반환
    const bookmarks = await User.findBookmarks({ id });
    return bookmarks;
  }
}

export { UserAuthService };
