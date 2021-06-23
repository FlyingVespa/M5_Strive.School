import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const usersRouter = express.Router();
const usersJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "users.json"
);
const getUsersArray = () => {
  const content = fs.readFileSync(usersJsonPath);
  return JSON.parse(content);
};
const writeUsers = (content) =>
  fs.writeFileSync(usersJsonPath, JSON.stringify(content));

//1  READ --> GET http://localhost:3333/users
usersRouter.get("/", (req, res, next) => {
  try {
    res.send("this is coming from user ");
    const users = getUsersArray();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//2  READ --> GET http://localhost:3333/users/:id
usersRouter.get("/:id", (req, res, next) => {
  try {
    res.send("this is coming from SINGLE user GET endpoint");
    const users = getUsersArray();
    const user = users.find((u) => u._id === req.params.userId);
    if (user) {
      res.send(user);
    } else {
      next(createError(404, `user with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

//3 CREATE --> POST http://localhost:3333/users
usersRouter.post("/", (req, res, next) => {
  try {
    res.send("this is coming from user  POST endpoint");
    const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
    const users = getUsersArray();
    users.push(newUser);
    writeUsers(users);
    res.status(201).send({ _id: newUser._id });
  } catch (error) {
    next(error);
  }
});

//4 UPDATE --> PUT http://localhost:3333/users/:id
usersRouter.put("/:id", (req, res, next) => {
  try {
    res.send("this is coming from SINGLE user PUT endpoint ");
    const users = getUsersArray();
    const remainingUsers = users.filter(
      (user) => user._id !== req.params.userId
    );
    const updatedUser = { ...req.body, _id: req.params.userId };
    remainingUsers.push(updatedUser);
    writeUsers(remainingUsers);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

//5 DELETE --> DELETE http://localhost:3333/users/:id
usersRouter.delete("/:id", (req, res, next) => {
  try {
    res.send("this is coming from SINGLE user DELETE enpoint");
    const users = getUsersArray();
    const remainingUsers = users.filter(
      (user) => user._id !== req.params.userId
    );
    writeUsers(remainingUsers);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
