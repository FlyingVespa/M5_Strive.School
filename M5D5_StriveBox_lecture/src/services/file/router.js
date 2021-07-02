import express, { Router } from "express";

const fileRouter = express();

// GET ALL
fileRouter.get("/", (req, res, next) => {
  try {
    res.send("create new files");
  } catch (error) {
    next(error);
  }
});
//  GET SINGLE
fileRouter.get("/:fileId", (req, res, next) => {
  try {
    res.send(`get single file with id new files`);
  } catch (error) {
    next(error);
  }
});

// POST

fileRouter.post("/", (req, res, next) => {
  try {
    res.send("create new files");
  } catch (error) {
    next(error);
  }
});
// UPDATE
fileRouter.put("/:fileId", (req, res, next) => {
  try {
    res.send("updated file");
  } catch (error) {
    next(error);
  }
});
//
fileRouter.delete("/:fileId", (req, res, next) => {
  try {
    res.send("deleted file");
  } catch (error) {
    next(error);
  }
});

export default fileRouter;
