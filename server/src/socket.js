import { Server } from "socket.io";

export const socket = (server, option, app) => {
  const io = new Server(server, option);

  io.sockets.on("connection", (socket) => {
    console.log("socket connected");
    console.log(socket.id);
  });

  io.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
};
