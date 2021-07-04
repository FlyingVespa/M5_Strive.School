import express, { Router } from "express";
import uniqueId from "uniqid";
import createError from "http-errors";
import {
  readFile,
  uploadFile,
  writeFile,
  findById,
} from "../../utils/fs-tools.js";
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
    np;
  } catch (error) {
    next(error);
  }
});

// 🟩 POST
fileRouter.post("/", async (req, res, next) => {
  try {
    // const { text } = req.body;
    // const newFile = {
    //   text,
    // };
    const files = await writeFile("files.json", req.body);
    res.send(files);
    // res.status(201).send({ _id: newFile._id });
  } catch (error) {
    next(error);
  }
});
//🟥 UPDATE
fileRouter.put("/:fileId", async (req, res, next) => {
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
      next(createError(400, { erroList: errors }));
    }
  } catch (error) {
    next(error);
  }
});
// 🟥 DELETE
fileRouter.delete("/:fileId", async (req, res, next) => {
  try {
    const deleted = await deleteById("files.json", req.params.fileId);
    res.status(200).send(deleted);
  } catch (error) {
    next(error);
  }
});

export default fileRouter;
