import express from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import createError from "http-errors";
import { validationResult } from "express-validator";
import {
  writeToFile,
  readFile,
  getDataFilePath,
} from "../../utils/fs-utils.js";

const reviewRouter = express.Router();

//1. GET ALL review
reviewRouter.get("/:mediaId/reviews", async (req, res, next) => {
  try {
    const reviews = await readFile("reviews.json");
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//2, GET SINGLE review
reviewRouter.get("/:mediaId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readFile("reviews.json");
    const review = reviews.find((review) => review._id === req.params.reviewId);
    if (review) {
      res.send(review);
    } else {
      next(
        createError(
          404,
          `That review you are looking for, might be no more!  ${req.params.userId} `
        )
      );
    }
    res.send(review);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//3. POST review
reviewRouter.post("/:mediaId/reviews", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { first_name, last_name, email, dob } = req.body;
      const newreview = {
        _id: uniqid(),
        first_name,
        last_name,
        email,
        dob,
        avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const reviews = await readFile("reviews.json");
      reviews.push(newreview);
      await writeToFile("reviews.json", reviews);
      res.status(201).send({ _id: newreview._id });
    } else {
      next(createError(400, { erroList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

//  4. PUT Single review
reviewRouter.put("/:mediaId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readFile("reviews.json");
    const remainingreviews = reviews.filter(
      (review) => review._id !== req.params.reviewId
    );
    const updatedreview = { ...req.body, _id: req.params.reviewId };
    remainingreviews.push(updatedreview);
    await writeToFile("reviews.json", remainingreviews);
    res.send(updatedreview);
    if (!reviewIndex == -1) {
      createError(
        404,
        `That review you are looking for, might be no more!  ${req.params.userId} `
      );
    }
    const prevreviewData = fileAsJSONarry[reviewIndex];
    const modreview = {
      ...prevreviewData,
      ...req.body,
      avatar: req.file,
      updatedAt: new Date(),
      _id: req.params.id,
    };
    fileAsJSONarry[reviewIndex] = modreview;
    fs.writeFileSync(
      getDataFilePath("reviews.json"),
      JSON.stringify(fileAsJSONarry)
    );
    res.send(modreview);
  } catch (error) {
    next(error);
  }
});

//5. DELETE  review
reviewRouter.delete("/:mediaId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readFile("reviews.json");
    const remainingreviews = reviews.filter(
      (review) => review._id !== req.params.reviewId
    );

    await writeToFile("reviews.json", remainingreviews);
    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
