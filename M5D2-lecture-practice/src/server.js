import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import usersRouter from "./services/users/index.js";
import booksRouter from "./services/books/index.js";

const port = 3001;

const server = express();

// ************************** MIDDLEWARES **************************

const loggerMiddleware = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
  next(); // mandatory to give the control to what is happening next
};

const loggerMiddleware2 = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
  next(); // mandatory to give the control to what is happening next
};

server.use(cors()); // GLOBAL MIDDLEWARE
server.use(express.json()); // GLOBAL MIDDLEWARE
server.use(loggerMiddleware); // GLOBAL MIDDLEWARE

// ************************* ENDPOINTS ***************************

server.use("/users", usersRouter);
server.use("/books", loggerMiddleware2, booksRouter); // loggerMiddleware2 is a ROUTER LEVEL MIDDLEWARE

// *************************** ERROR HANDLERS ***************************

server.user(catchErrorMiddleware);
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
