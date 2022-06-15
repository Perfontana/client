import { EventEmitter } from "events";
import createSocket from "./create-socket";
import { SocketClient } from "./socket-types";
import auth from "../store/auth";
import game from "../store/game";
import tracks from "../store/tracks";
import { getCurrentTime } from "../api/rooms";

export declare interface SocketConnection {
  on(event: "round-started", cb: () => void): this;
  on(event: "round-ended", cb: () => void): this;
  on(event: "game-ended", cb: () => void): this;
  on(event: "round-timer-ended", cb: () => void): this;
}

export class SocketConnection extends EventEmitter {
  socket: SocketClient | null = null;

  connect(token: string) {
    this.socket = createSocket(token);
    this.applyHandlers();
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  applyHandlers() {
    this.socket?.on("disconnect", () => console.log("Socket disconnected!"));

    this.socket?.onAny((message, data) => {
      console.log(message, data);
    });

    this.socket?.on("player-connected", (player) => {
      game.addPlayer(player);
    });

    this.socket?.on("player-updated", (updatedPlayer) => {
      game.updatePlayer(updatedPlayer);
    });

    this.socket?.on("round-timer-ended", () => {
      game.endTimer();
      this.emit("round-timer-ended");
    });

    this.socket?.on("player-disconnected", (player) => {
      if (player.name === auth.name) {
        game.clear();
        auth.clear();
        return;
      }
      game.removePlayer(player);
    });

    this.socket?.on("room-updated", (room) => {
      game.set(room);
    });

    this.socket?.on(
      "round-started",
      ({ currentRound }: { currentRound: number }) => {
        tracks.clear();
        getCurrentTime().then(({ time }) => {
          game.startTimer(time);
        });
        game.loadRoundSong();
        game.set({ isStarted: true, currentRound });
        this.emit("round-started", currentRound);
      }
    );

    this.socket?.on("round-ended", () => {
      game.endTimer();
      this.emit("round-ended");
    });

    this.socket?.on("game-ended", () => {
      this.emit("game-ended");
    });
  }
}

export const socketConnection = new SocketConnection();
