import express from "express";
import cors from "cors";

import fileRouter from "./services/file/router.js";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";
import { getPubDir } from "./utils/fs-tools.js";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} from "./utils/errorHandler.js";

dotenv.config();
const { PORT } = process.env;
const server = express();
server.use(express.json());

server.use("/files", fileRouter);
server.use("/downloads", express.static(getPubDir));

console.table(listEndpoints(server));
server.listen(PORT, () =>
  console.log(`✅ A portal has opened on ${PORT} , enter if you dare`)
);

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(catchAllErrorHandler);

server.on("error", (error) =>
  console.log(`❌ Server is not running due to the following oopsie : ${error}`)
);
