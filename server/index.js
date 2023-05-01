//utils
import express from "express";
import { connectToDb } from "./utils/db.js";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import WebSockets from "./utils/websockets.js";
import allowedOrigins from "./config/allowedOrigin.js";
//middleware
import { decode } from "./middelware/jwt.js";

//routes
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import roomRoutes from "./routes/room-routes.js";
import messageRoutes from "./routes/message-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sever is ready");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/room", decode, roomRoutes);
app.use("/message", decode, messageRoutes);

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

global.io.on("connection", WebSockets.connection);

const PORT = 5000;
connectToDb((err) => {
  if (!err) {
    server.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  }
});
