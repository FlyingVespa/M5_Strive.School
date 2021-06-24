import fs, { writeFile } from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { dir } from "console";

const { readJSON, writeJSON } = fs;

const authorsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../jsondata/authors.json"
);
const blogPostsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../jsondata/blogPosts.json"
);
const authorsPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/users"
);

export const getAuthors = async () => readJSON(authorsJSONpath);
export const getBlogPosts = async () => readJSON(blogPostsJSONpath);

export const writeAuthors = async (content) =>
  writeJSON(authorJSONspath, content);
export const writeBlogPosts = async (content) =>
  writeJSON(blogPostsJSONpath, content);

export const getCurrentFolderPath = async (currentFile) =>
  dir(fileURLToPath(currentFile));

export const writeCoverPicture = async (fileName, content) =>
  await writeFile(join(blogPostsJSONpath, fileName), content);

export const writeAuthorImage = async (filename, content) =>
  writeFile(join(authorsPublicFolderPath, filename), content);
