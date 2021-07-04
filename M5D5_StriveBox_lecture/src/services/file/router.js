import express, { Router } from "express";
import uniqueId from "uniqid";
import createError from "http-errors";
import fileValidation from "./validation.js";
import { validationResult } from "express-validator";
import {
  readFile,
  uploadFile,
  writeFile,
  findById,
  deleteById,
} from "../../utils/fs-tools.js";
import { write } from "fs-extra";
const fileRouter = express();

//🟩 GET ALL
fileRouter.get("/", async (req, res, next) => {
  try {
    const files = await readFile("files.json");
    res.send(files);
  } catch (error) {
    next(error);
  }
});
// 🟩 GET SINGLE not working
fileRouter.get("/:fileID", async (req, res, next) => {
  try {
    const file = await findById("files.json", req.params.fileID);
    res.status(200).send(file);
  } catch (error) {
    next(error);
  }
});

// 🟩 POST
fileRouter.post("/", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { text } = req.body;
      const newFile = {
        _id: uniqueId(),
        text: text,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const files = await readFile("files.json");
      console.log(files);
      files.push(newFile);
      await writeFile("files.json", files);
      res.send(newFile);
    } else {
      createError(400, "yes");
    }
  } catch (error) {
    next(error);
  }
});

//🟥 UPDATE
fileRouter.put("/:fileID", async (req, res, next) => {
  try {
    const file = await findById("files.json");
    if (file) {
      const newfile = {
        _id: req.params.fileID,
        text,
      };
      file = newfile;
      res.status(200).send({ _id: newFile._id });
    } else {
      next(createError(400, "error"));
    }
  } catch (error) {
    next(error);
  }
});
// 🟥 DELETE
fileRouter.delete("/:fileID", async (req, res, next) => {
  try {
    const files = await readFile("files.json");

    const remainingfiles = await files.filter(
      (file) => file._id !== req.params.fileID
    );
    console.log(remainingfiles);
    await writeFile("files.json", remainingfiles);
    res.send("succes");
  } catch (error) {
    next(error);
  }
});

export default fileRouter;
