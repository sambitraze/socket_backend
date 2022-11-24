const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const UserService = require("./routes/user.js");
const pool = require("./db_config");

app.use(express.json());
app.use(cors());
pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
          return console.error('Error executing query', err.stack)
      }
      console.log("DB Connection succesfull at: " + result.rows[0].now)
  })
})

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use('/user', UserService);

// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers
// } = require('./utils/users');

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
  console.log("new connection");
  UserService.AddUser("socket.id", "online");
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage 
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    console.log("disconnected")
  });
});


http.listen(8080, "0.0.0.0", (server) => {
  console.log("server started");
  console.log('Server listening:', `http://${http.address().address}:${http.address().port}`);
});