import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const usersRouter = express.Router();

//1  READ --> GET http://localhost:3333/users
usersRouter.get("/", (req, res) => {
  res.send("this is coming from user ");
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentFolderPath = dirname(currentFilePath);
  const usersJSONpath = join(currentFolderPath, "users.json");
  const usersJSON = fs.readFileSync(usersJSONpath);

  console.log(usersJSON);
  //   console.log(usersJSON.toString());
  res.send({
    currentFilePath,
    metaURL: import.meta.url,
    currentFolderPath,
    usersJSONpath,
  });
  // fs.readFileSync("users.json")
  // read user json file
  // send content  as a response
});

//2  READ --> GET http://localhost:3333/users/:id
usersRouter.get("/:id", (req, res) => {
  res.send("this is coming from SINGLE user GET endpoint");
});

//3 CREATE --> POST http://localhost:3333/users
usersRouter.post("/", (req, res) => {
  res.send("this is coming from user  POST endpoint");
});

//4 UPDATE --> PUT http://localhost:3333/users/:id
usersRouter.put("/:id", (req, res) => {
  res.send("this is coming from SINGLE user PUT endpoint ");
});

//5 DELETE --> DELETE http://localhost:3333/users/:id
usersRouter.delete("/:id", (req, res) => {
  res.send("this is coming from SINGLE user DELETE enpoint");
});

export default usersRouter;
