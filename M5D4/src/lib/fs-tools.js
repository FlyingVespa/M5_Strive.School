import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const authorJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../jsondata/authors.json"
);
const blogPostJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../jsondata/blogPosts.json"
);

export const getAuthors = () => readJSON(authorJSONpath);
export const getBlogPosts = () => readJSON(blogPostJSONpath);

export const writeAuthors = (content) => writeJSON(authorJSONpath);
export const writeBlogPosts = (content) => writeJSON(blogPostJSONpath);
