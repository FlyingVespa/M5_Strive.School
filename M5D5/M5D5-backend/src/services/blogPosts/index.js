import express from "express";
import uniqid from "uniqid";
import fs from "fs";
import createError from "http-errors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { validationResult } from "express-validator";
import postValidation from "./postValidation.js";

const blogPostsRouter = express.Router();
const blogPostsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../jsondata/blogPosts.json"
);
const getBlogPostArray = () => {
  const content = fs.readFileSync(blogPostsJSONpath);
  return JSON.parse(content);
};
const writeBlogPosts = (content) => {
  fs.writeFileSync(blogPostsJSONpath, JSON.stringify(content));
};

//1. GET ALL blogPosts
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getBlogPostArray();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

//2 GET Single Post
blogPostsRouter.get("/:blogId", postValidation, (req, res, next) => {
  try {
    const posts = getBlogPostArray();
    const post = posts.find((post) => post._id === req.params.blogId);
    if (post) {
      res.send(post);
    } else {
      next(
        createError(
          404,
          `the blog post id:${req.params.blogId}, is most likely deleted or never existed or pehaps hiding...`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

//3 POST blogPost
blogPostsRouter.post("/", (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { category, cover, content, title, author, readTime } = req.body;
      const { name, avatar } = req.body.author;
      const { value, unit } = req.body.readTime;
      const newPost = {
        _id: uniqid(),
        category,
        cover,
        title,
        content,
        author,
        readTime,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const posts = getBlogPostArray();
      posts.push(newPost);
      writeBlogPosts(posts);
      res.status(201).send({ _id: newPost._id });
    } else {
      next(createError(400, { errorsList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

//4 PUT blogPost
blogPostsRouter.put("/:blogId", (req, res, next) => {
  try {
    const posts = getBlogPostArray();
    const remainingPosts = posts.filter(
      (post) => post._id !== req.params.blogId
    );
    const modifiedPost = {
      ...req.body,
      id: req.params.blogId,
      modifiedAt: new Date(),
    };
    remainingPosts.push(modifiedPost);
    writeBlogPosts(remainingPosts);
    res.status(222).send("modified");
  } catch (error) {
    next(error);
  }
});

// 5. DELETE blogPost
blogPostsRouter.delete("/:blogId", (req, res, next) => {
  try {
    const posts = getBlogPostArray();
    const remainingPosts = posts.filter(
      (post) => post._id !== req.params.blogId
    );
    writeBlogPosts(remainingPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default blogPostsRouter;
