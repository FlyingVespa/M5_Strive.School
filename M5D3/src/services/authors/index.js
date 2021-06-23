import express from "express";
import fs from "fs";
import uniqid from "uniqid";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";
import { validationResult } from "express-validator";
// import { loggerMiddleware } from "./middlewares.js";
// import { authorValidation } from "./authorValidation";

export const loggerMiddleware = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
};

const authorsRouter = express.Router();
const authorJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
const getAuthorArray = () => {
  const content = fs.readFileSync(authorJSONpath);
  return JSON.parse(content);
};
const writeAuthor = (content) =>
  fs.writeFileSync(authorJSONpath, JSON.stringify(content));

//1. GET ALL authors
authorsRouter.get("/", loggerMiddleware, (req, res, next) => {
  try {
    const authors = getAuthorArray();
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

//2, GET SINGLE author
authorsRouter.get("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthorArray();
    const user = users.find((author) => author._id === req.params.authorId);
    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id
    );
    if (author) {
      res.send(author);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//3. POST author
authorsRouter.post("/", (req, res, next) => {
  try {
    if (errors.isEmpty()) {
      const { name, surname, email, dateOfBirth } = req.body;
      const newAuthor = { ...req.body, _id: uniqid(), createdAt: new Date() };
      const authors = getAuthorArray();
      authors.push(newAuthor);
      writeAuthor(authors);
      res.status(201).send({ _id: newAuthor._id });
    } else {
      next(createError(400, { erroList: errors }));
    }
    // const author = {
    //   id: uniqid(),
    //   name,
    //   surname,
    //   email,
    //   dateOfBirth,
    //   avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
  } catch (error) {
    next(error);
  }
});

//  update author
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const authors = getAuthorArray();
    const remainingAuthors = authors.filter(
      (author) => author._id !== req.params.userId
    );
    const updatedAuthor = { ...req.body, _id: req.params.userId };
    remainingAuthors.push(updatedAuthor);
    writeAuthor(remainingAuthors);
    res.send(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

//5. DELETE  author
authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const authors = getAuthorArray();
    const remainingAuthors = authors.filter(
      (author) => author._id !== req.params.authId
    );

    writeAuthor(remainingAuthors);
    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
