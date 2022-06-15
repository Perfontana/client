import { Socket } from "socket.io-client";
import Player from "../types/Player";
import Room from "../types/Room";

export interface ServerToClientEvents {
  "player-connected": (player: Player) => void;
  "player-updated": (player: Player) => void;
  "player-disconnected": (player: Player) => void;
  "player-ready": (player: Player) => void;
  "game-ended": () => void;
  "round-ended": () => void;
  "round-timer-ended": () => void;
  "round-started": (round: { currentRound: number }) => void;
  "room-updated": (room: Partial<Room>) => void;
}

export interface ClientToServerEvents {}

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;
