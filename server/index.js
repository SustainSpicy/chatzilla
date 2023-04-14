//utils
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import WebSockets from "./utils/WebSockets.js";
import logger from "morgan";

//routes
import authRoute from "./routes/auth-routes.js";
import userRoute from "./routes/user-routes.js";
import refreshRoute from "./routes/refresh-routes.js";
import chatRouter from "./routes/chat-routes.js";

// middlewares
import { decode } from "./middlewares/jwt.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import credentials from "./middlewares/credentials.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(logger("dev"));
app.use(credentials);
app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Sever is ready");
});

app.use("/user", authRoute);
app.use("/user", userRoute);
app.use("/room", decode, chatRouter);
app.use("/refresh", refreshRoute);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

/** Create HTTP server. */
const server = http.createServer(app);

/** Create socket connection */
global.io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

global.io.on("connection", WebSockets.connection);

mongoose
  .connect(DB_URL, { useUnifiedTopology: true })
  .then(server.listen(PORT, console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

export default app;
