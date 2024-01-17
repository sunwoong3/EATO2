import { Server } from "socket.io";

export const socket = (server, option, app) => {
  const io = new Server(server, option);

  io.on("connection", (socket) => {
    console.log("socket connection");
    console.log(socket);
    // ...
    socket.on("login", function (data) {
      console.log(data);

      // // socket에 클라이언트 정보를 저장한다
      // socket.name = data.name;
      // socket.userid = data.userid;

      // // 접속된 모든 클라이언트에게 메시지를 전송한다
      // io.emit("login", data.name);
    });
  });
};
