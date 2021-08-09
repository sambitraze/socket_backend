const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const todoRouter = require("./routes/todo");

app.use(express.json());
app.use(cors());

app.use("/todo", todoRouter);


// io.on('connection', (socket) => {
//     console.log(socket.id, 'joined');
//     socket.on('disconnect', () => {
//         console.log("disconneced");
//     })
// });
var API_KEY = '54f6128f1d33b36064b8542129c34926-64574a68-02aa1991';
var DOMAIN = 'ooing.live';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const data = {
  from: 'support@ooing.live',
  to: 'majhisambit2@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};


app.get('/', (req, res) => {
    mailgun.messages().send(data, (error, body) => {
        console.log(body);
        res.send(body);
      });
})

http.listen(8080, "0.0.0.0", () => {
    console.log("server started");
});