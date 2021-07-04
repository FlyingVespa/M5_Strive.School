import { fileURLToPath } from "url";
import uniqueId from "uniqid";
import fs from "fs-extra";
import { dirname, join, extname } from "path";
import multer from "multer";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { stringify } from "querystring";

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
  const test = await getDataFilePath(fileName);
  const jsonfile = await fs.readJSON(test);
  return jsonfile;
};

// *********************************** WRITE TO FILEW ***********************************

// MY METHOD:
export const writeFile = async (fileName, content) => {
  await fs.writeJSON(getDataFilePath(fileName), content);
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

export const deleteById = async (name, id) => {
  const filesJSONPath = await getDataFilePath(name);
  let json = await readFile(name);
  const foundObject = await json.find((obj) => obj.id === id);
  if (foundObject) {
    json = json.filter((obj) => obj.id !== id);
    await fs.writeJSON(filesJSONPath, json);
    return foundObject;
  } else {
    const error = createHttpError(404, "This object not found");
    throw error;
  }
};

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
