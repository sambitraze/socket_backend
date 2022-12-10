const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const pool = require("./db_config");

app.use(express.json());
app.use(cors());
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error("Error acquiring client", err.stack);
//   }
//   client.query("SELECT NOW()", (err, result) => {
//     release();
//     if (err) {
//       return console.error("Error executing query", err.stack);
//     }
//     console.log("DB Connection succesfull at: " + result.rows[0].now);
//   });
// });

// socket

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(8080, "0127.0.0.1", (server) => {
  console.log(
    "Server listening:",
    `http://${http.address().address}:${http.address().port}`
  );
});
