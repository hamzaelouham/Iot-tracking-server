const ref = require("../db");

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  gps: "gps",
};

function SendDataToClient({ io }) {
  ref.on("value", (snapshot) => {
    io.emit(EVENTS.gps, {
      coordinate: [snapshot.val().Latitude, snapshot.val().Longitude],
      speed: snapshot.val().speed,
    });
  });
}

module.exports = function socket({ io }) {
  console.log("Sockets enabled ...");

  io.on(EVENTS.connection, (socket) => {
    console.log("Client connected ");

    SendDataToClient({ io });

    socket.on(EVENTS.disconnect, () => {
      console.log("Client disconnected");
    });
  });
};
