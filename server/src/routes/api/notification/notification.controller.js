module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinNotification", (params, cb) => {
      socket.join(params.sender);
      cb();
    });

    socket.on("sendNotification", (request) => {
      io.to(request.reciever).emit("recieveNotification", request);
    });
  });
};
