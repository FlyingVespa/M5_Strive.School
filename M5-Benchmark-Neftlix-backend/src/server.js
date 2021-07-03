import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./services/media/index.js";
import reviewRouter from "./services/reviews/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from "./errorHandlers.js";

// import publicFolderPath from "./utils/fs-utils.js";

dotenv.config();
console.log(process.env.PORT);
const { PORT } = process.env;
const server = express();

// *************************** MIDDLEWARES  ********************************

// server.use(cors());
// server.use(express.join);
// server.use(express.static(publicFolderPath, "img")

// *************************** ROUTE PATHS *********************************

server.use("/media", mediaRouter);
// server.use("/media", reviewRouter);

// *************************** ERROR MIDDLEWARES ***************************

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(catchAllErrorHandler);

// *************************** PORT LISTEN *********************************

console.table(listEndpoints(server));
server.listen(PORT, () =>
  console.log(`✅ A portal has opened on ${PORT} , enter if you dare`)
);

server.on("error", (error) =>
  console.log(`❌ Server is not running due to the following oopsie : ${error}`)
);
