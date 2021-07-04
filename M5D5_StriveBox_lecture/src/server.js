import express from "express";
import fileRouter from "./services/file/router.js";
import listEndpoints from "express-list-endpoints";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} from "./utils/errorHandler.js";

const { PORT } = process.env;
const server = express();
server.use(express.json());

server.use("/files", fileRouter);

server.listen(PORT, () =>
  console.log(`✅ A portal has opened on ${PORT} , enter if you dare`)
);

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(catchAllErrorHandler);
console.table(listEndpoints(server));

server.on("error", (error) =>
  console.log(`❌ Server is not running due to the following oopsie : ${error}`)
);
