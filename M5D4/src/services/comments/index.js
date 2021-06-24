import express from "express"; // 3rd party package
import multer from "multer";
import uniqid from "uniqid"; // 3rd party package
import createError from "http-errors";
import { validationResult } from "express-validator";
import { postsValidation, commentsValidation } from "./validation.js";
import {
  getBlogPosts,
  writeCoverImgs,
  writeToBlog,
  getComments,
} from "../../lib/fs-tools.js";

const commentsRouter = express.Router();

//1. GET ALL comments
commentsRouter.get("/:id/comments", async (req, res, next) => {
  try {
    console.log("getting all people's opions, thoughts and utterances");
    const comments = await getComments();
    res.send(comments);
  } catch (error) {
    next(error);
  }
});
// 2 GET SINGLE COMMENT
commentsRouter.get("/:id/comments/:commentId", async (req, res, next) => {
  try {
    const comments = await getComments();
    const comment = comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (comment) {
      res.send(comment);
      console.log("getting a person's unvalidaded opinion");
    } else {
      next(
        createError(
          404,
          "This comment is not found, try again, or look for a more valid comment"
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// 3  POST A COMMENT
commentsRouter.post("/:id/comments", async (req, res, next) => {
    try {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const { text,image } = req.body
        const comments = getComments();
const newComment = {
    _id:uniqid(),
    author: this.params.id,
    image,
    text,
    createdAt: new Date();
    updatedAt: new Date();
}
const comments = await getComments();
comments.push(newComment)
    } else{
        next(createError(400, {errorList:error}))
    }

} catch (error) {
    next(error)
}

});

// 4 PUT COMMENT
commentsRouter.put("/:id/comments/:commentId", async (req, res, next) => {
  try {
    const comments = await getComments();
    const remainingComments = comments.filter(
      (comment) => comment._id !== req.params.commentsId
    );
    const updatedComment = { ...req.body, _id: req.params.commentId };
    await remainingComments.push(updatedComment);
    res.send(updatedComment);
  } catch (error) {
    next(error);
  }
});

//  5 DELETE comment 
commentsRouter.delete("/:id/comments/:commentId", async (req, res, next) => {
    try {
      const comments = await getComments();
      const remainingComments = comments.filter(
        (comment) => comment._id !== req.params.commentsId
      );
      const updatedComment = { ...req.body, _id: req.params.commentId };
      await writeComment.(remainingComments)
      res.status(200).send("Comment has been exterminated");
    } catch (error) {
      next(error);
    }
  });