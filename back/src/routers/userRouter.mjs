import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.mjs";
import { UserAuthService } from "../services/userService.mjs";
import { body, validationResult } from "express-validator";
import { setMailOptions, send } from "../utils/mail.mjs";
import { generatePassword } from "../utils/password.mjs";

const userAuthRouter = Router();

userAuthRouter.post("/users/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요",
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await UserAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/users/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await UserAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/users/login/kakao", async (req, res, next) => {
  try {
    const code = req.query.code;

    const user = await UserAuthService.upsertKakaoUser({ code });

    // const redirect_uri = `http://localhost:3000/login/kakao?token=${user.token}`;
    // 배포용으로 수정
    const redirect_uri = `http://elice-kdt-ai-4th-team03.elicecoding.com/login/kakao?token=${user.token}`;
    res.status(200).redirect(redirect_uri);
  } catch (err) {
    next(err);
  }
});

userAuthRouter.get(
  "/users/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const id = req.currentUserId;
      const currentUserInfo = await UserAuthService.getUserInfo({
        id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  },
);

userAuthRouter.put("/users", login_required, async function (req, res, next) {
  try {
    // 현재 로그인된 사용자 id를 추출함.
    const id = req.currentUserId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    let toUpdate = {};

    const name = req.body.name ?? null;
    if (name) {
      toUpdate = { ...toUpdate, name };
    }
    const email = req.body.email ?? null;
    if (email) {
      toUpdate = { ...toUpdate, email };
    }
    const password = req.body.password ?? null;
    if (password) {
      toUpdate = { ...toUpdate, password };
    }

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함.
    const updatedUser = await UserAuthService.setUser({ id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentUserInfo = await UserAuthService.getUserInfo({ id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  },
);

userAuthRouter.delete("/users", login_required, async (req, res, next) => {
  try {
    // 현재 로그인된 사용자 id를 추출함.
    const id = req.currentUserId;

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 삭제함.
    const deletedUser = await UserAuthService.deleteUser({ id });

    if (deletedUser.errorMessage) {
      throw new Error(deletedUser.errorMessage);
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.patch(
  "/bookmarks/:behavior",
  login_required,
  body("restaurantId").notEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("요청 내용이 비어 있습니다.");
        error.statusCode = 400;
        throw error;
      }

      const id = req.currentUserId; // 현재 로그인된 사용자 id를 추출함.
      const { restaurantId } = req.body;

      // 해당 레스토랑 아이디에 대하여 북마크 추가(do)/취소(undo)함.
      if (req.params.behavior == "do") {
        const bookmarks = await UserAuthService.updateBookmark({
          id,
          restaurantId,
        });

        res.status(200).json(bookmarks);
      } else if (req.params.behavior == "undo") {
        const bookmarks = await UserAuthService.deleteBookmark({
          id,
          restaurantId,
        });

        res.status(200).json(bookmarks);
      }
    } catch (error) {
      next(error);
    }
  },
);

userAuthRouter.get("/bookmarks/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // 해당 유저 아이디의 북마크 리스트를 가져옴.
    const bookmarks = await UserAuthService.getBookmarks({ id });

    res.status(200).send(bookmarks);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post(
  "/password-reset",
  body("email").notEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("요청 내용이 비어 있습니다.");
        error.statusCode = 400;
        throw error;
      }

      // req (request) 에서 데이터 가져오기
      const email = req.body.email;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await UserAuthService.getUserByEmail({ email });
      const { id, name } = user;
      const password = generatePassword();
      const toUpdate = { password };

      const updatedUser = await UserAuthService.setUser({ id, toUpdate });
      const { to, subject, html } = setMailOptions({ email, name, password });

      const { msg } = send({ to, subject, html });

      const response = {
        code: 200,
        data: { msg, updatedUser },
      };

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

export { userAuthRouter };
