import { fileURLToPath } from "url";
import uniqueId from "uniqid";
import fs from "fs-extra";
import { dirname, join, extname } from "path";
import multer from "multer";
import dotenv from "dotenv";
import createHttpError from "http-errors";

// *********************************** ENV CONFIG *******************************************
dotenv.config();
console.log(process.env.PORT);
const { PORT } = process.env;
const { readJSON, writeJSON } = fs;
// *********************************** FILE PATHS *******************************************
// MY METHOD
export const getDataFilePath = (fileName) => {
  return join(
    dirname(fileURLToPath(import.meta.url)),
    "../jsondata/",
    fileName
  );
};

// *********************************** READING JSON FILES ***********************************
// MY METHOD:
export const readFile = async (fileName) => {
  const test = getDataFilePath(fileName);
  const jsonfile = await fs.readJSON(test);
  return jsonfile;
};

// *********************************** WRITE TO FILEW ***********************************

// MY METHOD:
export const writeFile = async (fileName, content) => {
  //   const filePath = await getDataFilePath(fileName);
  const json = await readFile(fileName);
  json.push({
    _id: uniqueId(),

    createdAt: new Date(),
    updatedAt: new Date(),
    ...content,
  });
  await fs.writeJSON(filePath, json);
  return json;
};
// const file = await files.find((file) => file._id === req.params.fileID);
export const findById = async (fileName, id) => {
  const files = await readFile(fileName);
  const file = await files.find((file) => file._id === id);
  if (file) {
    return file;
  } else {
    createHttpError(404, "Could not find");
  }
};

// export const findById = async (fileName, id) => {
//   const json = await readFile(fileName);
//   const foundObj = json.filter((obj) => obj.id === id);
//   if (foundObj) {
//     return foundObj;
//   } else {
//     createHttpError(404, "Object cannot be found");
//   }
// };
// export const writeToFile = async (filename, content) => {
//   const json = await fs.writeFileSync(
//     getDataFilePath(filename),
//     JSON.stringify(content)
//   );
//   json.push({
//     _id,
//     ...content,
//   });
// };

// export const deleteById = async (fileName, id) => {
//   const jsonFile = getDataFilePath(fileName);
//   let files = await readFile(fileName);
//   const file = await files.filter((file) => file._id === id);
//   if (file) {
//     files = files.find((obj) => obj.id !== id);
//     await fs.writeJSON(jsonFile, files);
//   } else {
//     createHttpError(400, "something went wrong");
//   }
// };

export const convertFile = multer();

export const uploadFile = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    fs.writeFileSync(path.join(getDataFilePath, fileName), buffer);
    req.file = `http://localhost:${PORT}/${fileName}`;
    next();
  } catch (error) {
    next(error);
  }
};
