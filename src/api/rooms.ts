import Player from "../types/Player";
import Room from "../types/Room";
import { api } from "./base";

interface TokenResponse {
  token: string;
}

type CreateRoomResponse = TokenResponse & { code: string };

export type CreateRoomType = Pick<
  Room,
  "name" | "maximumPlayers" | "roundTime" | "players"
>;

export const createRoom = async (room: CreateRoomType) => {
  return api<CreateRoomResponse>("/rooms", {
    method: "POST",
    body: JSON.stringify(room),
  });
};

export const joinRoom = async (
  roomCode: string,
  player: Pick<Player, "name">
) => {
  return api<TokenResponse>(`/rooms/${roomCode}/join`, {
    method: "POST",
    body: JSON.stringify(player),
  });
};

export const getRoom = async (roomCode: string) => {
  return api<Room>(`/rooms/${roomCode}`, { method: "GET" });
};

export const startGame = async (roomCode: string) => {
  return api<any>(`/rooms/${roomCode}/start`, { method: "GET" });
};

export const removePlayer = async (roomCode: string, playerName: string) => {
  return api<any>(`/rooms/${roomCode}/players/${playerName}`, {
    method: "DELETE",
  });
};
