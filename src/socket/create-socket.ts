import { io } from "socket.io-client";
import { SERVER_URL } from "../api/base";
import { SocketClient } from "./socket-types";

const createSocket = (token: string): SocketClient =>
  io(SERVER_URL, { auth: { token } });

export default createSocket;
