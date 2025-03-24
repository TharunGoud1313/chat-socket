const express = require("express"); // lightweight module for building web applications
const http = require("http"); // built in module to build http server
const { Server } = require("socket.io"); // handles real time web sockets
const cors = require("cors"); // prevents CORS from blocking requests

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected---", socket.id);

  socket.on("join_room", (chatId) => {
    socket.join(chatId); // this should be same for two users, so that that two users can chat
    console.log("User Joined Chat----", chatId);
  });

  socket.on("send_msg", (data) => {
    console.log("data----", data);
    io.to(data.soc_room_id).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected---", socket.id);
  });
});

server.listen(3002, () => {
  console.log("server is running on port 3002");
});
