import { writeFile } from "fs";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { dirname, join } from "path";
import { dir } from "console";
import multer from "multer";

const { readJSON, writeJSON } = fs;

// PATHS
export const getDataFilePath = async (fileName) =>
  await join(dirname(fileURLToPath(import.meta.url)), "../jsondata/", fileName);

//  JSON PARSED ARRAYS
export const readFile = async (filename) => {
  const jsonFilePath = getDataFilePath(filena);
  const jsonfile = await fs.readJSON(jsonFilePath);
  return jsonfile;
};

const authorsPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/users"
);
const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/"
);

// Write to files
export const writeToFile = async (filename, content) => {
  await fs.writeFileSync(getDataFilePath(filename), JSON.stringify(content));
};

export const writeAuthor = (content) => {
  fs.writeFileSync(authorJSONpath, JSON.stringify(content));
};

const convertFile = multer();
export const uploadFile = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(publicFolderPath);
    res.send("ok");
  } catch (error) {
    next(error);
  }
};

export const getAuthors = async (name) => await readJSON(getDataFilePath(name));
// export const getBlogPosts = async () => await readJSON(blogPostsJSONpath);
// export const getComments = async () => await readJSON(commentsJSONpath);
// export const writeAuthors = async (content) =>
//   await writeJSON(authorJSONspath, content);
// export const writeBlogPosts = async (content) =>
//   await writeJSON(blogPostsJSONpath, content);
// export const getCurrentFolderPath = async (currentFile) =>
//   await dirname(fileURLToPath(currentFile));
// export const writeCoverPicture = async (fileName, content) =>
//   await writeFile(join(blogPostsJSONpath, fileName), content);
// export const writeAuthorImage = async (filename, content) =>
//   await writeFile(join(authorsPublicFolderPath, filename), content);
