import { writeFile } from "fs";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { dirname, join } from "path";
import { dir } from "console";
import multer from "multer";

const { readJSON, writeJSON } = fs;

// File Paths
export const getDataFilePath = (fileName) =>
  join(dirname(fileURLToPath(import.meta.url)), "../jsondata/", fileName);

//  JSON PARSED ARRAYS
export const readFile = async (fileName) => {
  const test = getDataFilePath(fileName);
  const jsonfile = await fs.readJSON(test);
  return jsonfile;
};

// Write to files
export const writeToFile = async (filename, content) => {
  await fs.writeFileSync(getDataFilePath(filename), JSON.stringify(content));
};

export const convertFile = multer();
export const uploadFile = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(publicFolderPath);
    res.send("ok");
  } catch (error) {
    next(error);
  }
};
