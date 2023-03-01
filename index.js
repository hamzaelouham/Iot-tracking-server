const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const socket = require("./socket");
const ref = require("./db");
const config = require("./config");

const port = process.env.PORT;
const host = process.env.HOST;
const corsOrigin = config.front_url;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => res.send("hello world"));

app.post("/", (req, res) => {
  ref.set({
    Latitude: parseFloat(req.body.lat),
    Longitude: parseFloat(req.body.long),
    speed: req.body.speed || 0,
  });
  res.send("gps data");
});

httpServer.listen(port, host, () => {
  console.log(` Server  is listening `);
  console.log(`http://${host}:${port}`);
  socket({ io });
});
