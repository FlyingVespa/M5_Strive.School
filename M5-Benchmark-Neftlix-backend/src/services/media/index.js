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

//2, GET SINGLE media
// mediaRouter.get("/:mediaId", async (req, res, next) => {
//   try {
//     const medias = await readFile("media.json");
//     const media = medias.find((media) => media._id === req.params.mediaId);
//     if (media) {
//       res.send(media);
//     } else {
//       next(
//         createError(
//           404,
//           `That media you are looking for, might be no more!  ${req.params.userId} `
//         )
//       );
//     }
//     res.send(media);
//   } catch (error) {
//     res.send(500).send({ message: error.message });
//   }
// });

//3. POST media
// mediaRouter.post("/", async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       const { Title, Year, Type, Poster } = req.body;
//       const newmedia = {
//         imdbID: uniqid(),
//         Title,
//         Type,
//         Year,
//         Poster,
//       };
//       const medias = await readFile("media.json");
//       medias.push(newmedia);
//       await writeToFile("media.json", medias);
//       res.status(201).send({ _id: newmedia._id });
//     } else {
//       next(createError(400, { erroList: errors }));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

//  4. PUT Single media
// mediaRouter.put("/:mediaId", async (req, res, next) => {
//   try {
//     const medias = await readFile("media.json");
//     const remainingmedias = medias.filter(
//       (media) => media._id !== req.params.mediaId
//     );
//     const updatedmedia = { ...req.body, _id: req.params.mediaId };
//     remainingmedias.push(updatedmedia);
//     await writeToFile("media.json", remainingmedias);
//     res.send(updatedmedia);
//     if (!mediaIndex == -1) {
//       createError(
//         404,
//         `That media you are looking for, might be no more!  ${req.params.userId} `
//       );
//     }
//     const prevmediaData = fileAsJSONarry[mediaIndex];
//     const modmedia = {
//       ...prevmediaData,
//       ...req.body,
//       avatar: req.file,
//       updatedAt: new Date(),
//       _id: req.params.id,
//     };
//     fileAsJSONarry[mediaIndex] = modmedia;
//     fs.writeFileSync(
//       getDataFilePath("media.json"),
//       JSON.stringify(fileAsJSONarry)
//     );
//     res.send(modmedia);
//   } catch (error) {
//     next(error);
//   }
// });

//5. DELETE  media
// mediaRouter.delete("/:mediaId", async (req, res, next) => {
//   try {
//     const medias = await readFile("media.json");
//     const remainingmedias = medias.filter(
//       (media) => media._id !== req.params.mediaId
//     );

//     await writeToFile("media.json", remainingmedias);
//     res.status(200).send("Deleted!");
//   } catch (error) {
//     next(error);
//   }
// });

export default mediaRouter;
