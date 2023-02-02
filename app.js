const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const { PrismaClient } = require('@prisma/client')
const d = require('@directus/sdk');
const directus = new d.Directus('https://admin.ezchat.agpro.co.in');
app.use(express.json());
app.use(cors());
let authenticated = false;
async function auth() {
  // AUTHENTICATION

  authenticated = false;

  // Try to authenticate with token if exists
  await directus.auth
    .refresh()
    .then(() => {
      authenticated = true;
    })
    .catch(() => { });

  // Let's login in case we don't have token or it is invalid / expired
  while (!authenticated) {
    const email = "messagesaver@ezchat.com";
    const password = "12345678";

    await directus.auth
      .login({ email, password })
      .then(() => {
        authenticated = true;
        console.log('Authenticated');
      })
      .catch(() => {
        console.log('Invalid credentials');
      });
  }
}
// socket

var users = {};

io.on("connection", (socket) => {
  console.log(`user ${socket.handshake.query.user} connected`);
  users[socket.handshake.query.user] = socket.id;
  console.log(users);
  socket.on("message", async (msg) => {
    await auth();
    io.to(users[msg.receiver]).emit("passmessage", msg);
    if (authenticated) {
     await directus.items('message').createOne({
        text: msg.text,
        sender: msg.sender,
        receiver: msg.receiver,
        time: msg.time,
        messageType: msg.messageType,
        messageStatus: 'sent',
      }).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }
  });
  socket.on("disconnect", (socket) => {
    console.log(`user disconnected`);
  });
});

app.get("/", async (req, res) => {
  // const allMessages = await prisma.messages.findMany();
  // console.dir(allMessages, { depth: null })
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
