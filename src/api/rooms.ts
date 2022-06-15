import auth from "../store/auth";
import Player from "../types/Player";
import Room from "../types/Room";
import { api } from "./base";

interface TokenResponse {
  token: string;
}

type CreateRoomResponse = TokenResponse & { code: string };

export type CreateRoomType = Pick<Room, "players">;

export const createRoom = async (room: CreateRoomType) => {
  return api<CreateRoomResponse>("/rooms", {
    method: "POST",
    body: JSON.stringify(room),
  });
};

export const updateRoom = async (room: Partial<Room>) => {
  return api<CreateRoomResponse>("/rooms", {
    method: "PUT",
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

export const getRoom = async () => {
  return api<Room>(`/rooms`, { method: "GET" });
};

export const startGame = async () => {
  return api<any>(`/rooms/start`, { method: "GET" });
};

export const removePlayer = async (playerName: string) => {
  return api<any>(`/rooms/players/${playerName}`, {
    method: "DELETE",
  });
};

export const getCurrentTime = async () => {
  return api<any>("/rooms/timer");
};

export const sendSong = async (formData: FormData) => {
  const request = new XMLHttpRequest();
  request.open("POST", "/api/v1/rooms/song");
  request.setRequestHeader("Authorization", auth.token);
  request.send(formData);
};

export const getSong = async () => {
  return api<{ url: string }>("/rooms/song");
};
