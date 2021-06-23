import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { validationResult } from "express-validator";
import { postValidation } from "./postValidation";

const blogPostsRouter = express.Router();
const blogPostsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);

const getBlogPostArray = () => {
  const content = fs.readFileSync(blogPostsJSONpath);
  return JSON.parse(content);
};
const writeBlogPosts = (content) => {
  fs.writeFileSync(blogPostsJSONpath, JSON.stringify(content));
};

//1. GET ALL blogPosts
blogPostsRouter.get("/", (req, res, next) => {
  try {
    const posts = getPosts();

    if (req.query && req.query.title) {
      const filteredBlogPost = posts.filter(
        (post) => post.hasOwnProperty("title") && post.title === req.query.title
      );
      res.send(filteredBlogPost);
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const posts = getPosts();
    const post = posts.find((post) => post._id === req.params.id);
    res.send(post);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.post("/", postValidation, (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(createError(400, { errorList: errors }));
    } else {
      const posts = getPosts();
      const newPost = { _id: uniqid(), ...req.body, createdAt: new Date() };
      posts.push(newPost);
      writePosts(posts);

      res.status(201).send({ id: newPost._id });
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.post(
  "/:id",

  (req, res, next) => {
    try {
      const posts = getPosts();
      const post = posts.find((post) => post._id === req.params.id);
      post.cover = `${req.file.path}`;
      const remainingPosts = posts.filter((post) => post._id !== req.params.id);
      remainingPosts.push(post);
      writePosts(remainingPosts);
      res.send(post);
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.put("/:id", async (req, res, next) => {
  try {
    const posts = getPosts();
    const newPosts = posts.filter((post) => post._id !== req.params.id);
    const modifiedPost = {
      ...req.body,
      id: req.params.id,
      modifiedAt: new Date(),
    };
    newPosts.push(modifiedPost);

    writePosts(newPosts);
    res.send(modifiedPost);
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
    const posts = getPosts();
    const remainingPosts = posts.filter((post) => post._id !== req.params.id);
    writePosts(remainingPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default blogPostRouter;
