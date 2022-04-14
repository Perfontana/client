import { action, makeObservable, observable, runInAction } from "mobx";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../api/base";
import { getRoom, startGame } from "../api/rooms";
import Player from "../types/Player";

class Game {
  @observable loading: boolean = false;
  @observable error: any = "";

  @observable name: string = "";
  @observable maximumPlayers: number = 0;
  @observable roundTime: number = 0;
  @observable isStarted: boolean = false;
  @observable currentRound: number = 0;
  @observable code: string = "";
  @observable players: Player[] = [];

  socket: Socket | null = null;

  constructor() {
    makeObservable(this);
  }

  @action async loadRoom(roomCode: string) {
    this.loading = true;

    try {
      const room = await getRoom(roomCode);
      runInAction(() => this.set({ loading: false, ...room }));
    } catch (e) {
      runInAction(() => this.set({ loading: false, error: e }));
    }
  }

  @action connect(token: string) {
    this.socket = io(SERVER_URL, { auth: { token } });
    this.addSocketHandlers();
  }

  @action disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  @action start() {
    startGame(this.code);
  }

  @action set(values: Partial<Game>) {
    Object.assign(this, values);
  }

  isOwner(playerName: string) {
    const owner = this.players.find((player) => player.isOwner);
    return playerName === owner?.name;
  }

  @action clear() {
    this.name = "";
    this.maximumPlayers = 0;
    this.roundTime = 0;
    this.code = "";
    this.players = [];
    this.isStarted = false;
    this.currentRound = 0;
  }

  @action addPlayer(player: Player) {
    this.players.push(player);
  }

  @action updatePlayer(playerToUpdate: Player) {
    this.players = this.players.map((player) => {
      if (player.name === playerToUpdate.name) {
        player = { ...player, ...playerToUpdate };
      }

      return player;
    });
  }

  @action removePlayer(player: Pick<Player, "name">) {
    const playerIndex = this.players.findIndex((p) => p.name === player.name);
    if (playerIndex < 0) return;
    this.players.splice(playerIndex, 1);
  }

  private addSocketHandlers() {
    this.socket?.onAny((message, data) => {
      console.log(message, data);
    });

    this.socket?.on("player-connected", (player: Player) => {
      this.addPlayer(player);
    });

    this.socket?.on("player-updated", (updatedPlayer: Player) => {
      this.updatePlayer(updatedPlayer);
    });

    this.socket?.on("player-disconnected", (player: Player) => {
      this.removePlayer(player);
    });

    this.socket?.on(
      "round-started",
      ({ currentRound }: { currentRound: number }) => {
        this.isStarted = true;
        this.currentRound = currentRound;
      }
    );
  }
}

const game = new Game();

export default game;
