import express from "express";
import { body } from "express-validator";
import fs from "fs-extra";
import uniqid from "uniqid";
import createError from "http-errors";
// import mediaValidation from "./valditionHandler.js";
import { validationResult } from "express-validator";
import {
  writeToFile,
  readFile,
  getDataFilePath,
} from "../../utils/fs-utils.js";

const mediaRouter = express.Router();

//1. GET ALL media
mediaRouter.get("/", async (req, res, next) => {
  try {
    const medias = await readFile("media.json");
    res.send(medias);
  } catch (error) {
    next(error);
  }
});

// 2, GET SINGLE media
mediaRouter.get("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readFile("media.json");
    const media = medias.find((media) => media.imdbID === req.params.imdbID);
    if (media) {
      res.send(media);
    } else {
      next(
        createError(
          404,
          `That media you are looking for, might be no more!  ${req.params.userId} `
        )
      );
    }
    res.send(media);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// 3. POST media
mediaRouter.post("/", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let { Title, Year, Type, Poster } = req.body;
      let newmedia = {
        imdbID: uniqid(),
        Title,
        Type,
        Year,
        Poster,
      };
      const medias = await readFile("media.json");
      medias.push(newmedia);
      await writeToFile("media.json", medias);
      res.status(201).send({ imdbID: newmedia.imdbID });
    } else {
      next(createError(400, { erroList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

//  4. PUT Single media
mediaRouter.put("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readFile("media.json");
    const remainingmedias = medias.filter(
      (media) => media.imdbID !== req.params.imdbID
    );
    const updatedmedia = { ...req.body, imdbID: req.params.imdbID };
    remainingmedias.push(updatedmedia);
    await writeToFile("media.json", remainingmedias);
    res.send(updatedmedia);
    if (!mediaIndex == -1) {
      createError(
        404,
        `That media you are looking for, might be no more!  ${req.params.userId} `
      );
    }
    const prevmediaData = fileAsJSONarry[mediaIndex];
    const modmedia = {
      ...prevmediaData,
      ...req.body,
      avatar: req.file,
      updatedAt: new Date(),
      imdbID: req.params.id,
    };
    fileAsJSONarry[mediaIndex] = modmedia;
    fs.writeFileSync(
      getDataFilePath("media.json"),
      JSON.stringify(fileAsJSONarry)
    );
    res.send(modmedia);
  } catch (error) {
    next(error);
  }
});

// 5. DELETE  media
mediaRouter.delete("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readFile("media.json");
    const remainingmedias = medias.filter(
      (media) => media.imdbID !== req.params.imdbID
    );

    await writeToFile("media.json", remainingmedias);
    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
