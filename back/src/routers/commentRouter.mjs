import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.mjs";
import { body, validationResult } from "express-validator";
import { CommentService } from "../services/commentService.mjs";

const commentRouter = Router();

commentRouter.post(
  "/comments",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        const error = new Error(
          "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요",
        );
        error.statusCode = 400;
        throw error;
      }

      const userId = req.currentUserId;
      const { reviewId, mentionName, text } = req.body ?? null;

      const createdNewComment = await CommentService.createComment({
        reviewId,
        userId,
        mentionName,
        text,
      });

      res.status(201).json(createdNewComment);
    } catch (error) {
      next(error);
    }
  },
);

commentRouter.patch(
  "/comments/:commentId",
  login_required,
  body("text").notEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("요청 내용이 비어 있습니다.");
        error.statusCode = 400;
        throw error;
      }

      const id = req.params.commentId;
      const toUpdate = { text: req.body.text };

      const updatedComment = await CommentService.updateComment({
        id,
        toUpdate,
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  },
);

commentRouter.delete(
  "/comments/:commentId",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.commentId;
      const result = await CommentService.deleteComment({ id });
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
);

export { commentRouter };
