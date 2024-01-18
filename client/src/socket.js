import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "http://etao2.com"
    : "http://localhost:3003";

export const socket = io(URL);
