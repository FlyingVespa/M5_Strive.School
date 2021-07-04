import express, { Router } from "express";
import uniqueId from "uniqid";
import multer from "multer";
import fs from "fs-extra";
import fileValidation from "./validation.js";
import { validationResult } from "express-validator";
import {
  readFile,
  writeFile,
  findById,
  getDataFilePath,
} from "../../utils/fs-tools.js";
import { write } from "fs-extra";
import createHttpError from "http-errors";
const fileRouter = express();
const upload = multer();
//🟩 GET ALL
fileRouter.get("/", async (req, res, next) => {
  try {
    const files = await readFile("files.json");
    res.send(files);
  } catch (error) {
    next(error);
  }
});
// 🟩 GET SINGLE
fileRouter.get("/:fileID", async (req, res, next) => {
  try {
    const file = await findById("files.json", req.params.fileID);
    res.status(200).send(file);
  } catch (error) {
    next(error);
  }
});

// 🟩 POST
fileRouter.post("/", upload.single("cover"), async (req, res, next) => {
  try {
    console.log(req.body);
    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //   const { text } = req.body;
    //   const newFile = {
    //     _id: uniqueId(),
    //     text: text,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const files = await readFile("files.json");
    //   console.log(files);
    //   files.push(newFile);
    //   await writeFile("files.json", files);
    //   res.send(newFile);
    // } else {
    //   next(createHttpError(400, "{ erroList: errors }"));
    // }
    const { originalname, buffer } = req.file;
    const filePath = getDataFilePath(originalname);
    await fs.writeFile(filePath, buffer);
    console.log(req.file);
    res.send("files");
  } catch (error) {
    next(error);
  }
});

//🟩 UPDATE
fileRouter.put("/:fileID", async (req, res, next) => {
  try {
    const files = await readFile("files.json");
    const remainingfiles = files.filter(
      (file) => file._id !== req.params.fileID
    );
    if (remainingfiles) {
      const updatedFile = { ...req.body, _id: req.params.fileID };
      await remainingfiles.push(updatedFile);
      await writeFile("files.json", remainingfiles);
      res.send(updatedFile);
    } else {
      next(createHttpError(400, "Something wrong"));
    }
  } catch (error) {
    next(error);
  }
});
// 🟩 DELETE
fileRouter.delete("/:fileID", async (req, res, next) => {
  try {
    const files = await readFile("files.json");

    const remainingfiles = await files.filter(
      (file) => file._id !== req.params.fileID
    );
    console.log(remainingfiles);
    await writeFile("files.json", remainingfiles);
    res.send("deleted");
  } catch (error) {
    next(error);
  }
});

export default fileRouter;
