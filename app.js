const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { PrismaClient } = require('@prisma/client')

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient()

// socket

var users = {};

io.on("connection", (socket) => {
  console.log(`user ${socket.handshake.query.user} connected`);
  users[socket.handshake.query.user] = socket.id;
  console.log(users);
  socket.on("message", (msg) => {
    console.log(msg);
    io.to(users[msg.receiver]).emit("passmessage", msg);
  });
  socket.on("disconnect", (socket) => {
    console.log(`user disconnected`);
  });
});

app.get("/", async (req, res) => {
  const allMessages = await prisma.messages.findMany();
  console.dir(allMessages, { depth: null })
  res.send("Hello World! <a href='/chat'>Chat</a>");

});
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(8080, "0.0.0.0", (server) => {
  console.log(
    "Server listening:",
    `http://${http.address().address}:${http.address().port}`
  );
});
