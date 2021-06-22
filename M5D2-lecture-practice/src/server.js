import express from "express";
import listEndpoints from "express-list-endpoints";

import usersRouter from "./services/users/index.js";
import booksRouter from "./services/books/index.js";
const server = express();
const port = 3333;

// <------------------------ ENDPOINTS
server.use("/users", usersRouter);
server.use("/books", booksRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`You have awakend a portal on port ${port} enter if you dare`);
});
