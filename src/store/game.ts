import { message } from "antd";
import { action, makeObservable, observable, runInAction } from "mobx";
import { isErrorResponse } from "../api/base";
import { getRoom, getSong, startGame } from "../api/rooms";
import { Sample } from "../audio/Sample";
import { SocketClient } from "../socket/socket-types";
import Player from "../types/Player";
import tracks from "./tracks";

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
  @observable isEnded: boolean = false;
  @observable currentTime: number = 0;
  @observable rounds: {
    player: string;
    song: string;
    sent: boolean;
  }[][] = [];
  @observable songs: Record<string, { player: string; url: string }[]> = {};

  socket: SocketClient | null = null;

  constructor() {
    makeObservable(this);
  }

  @action async loadRoom() {
    try {
      const room = await getRoom();

      if (isErrorResponse(room)) {
        message.error(room.message);
        return;
      }

      runInAction(() => this.set({ loading: false, ...room }));
    } catch (e) {
      console.log(e);
      runInAction(() => this.set({ loading: false, error: e }));
    }
  }

  @action start() {
    startGame();
  }

  isOwner(playerName: string) {
    const owner = this.players.find((player) => player.isOwner);
    return playerName === owner?.name;
  }

  @action set(values: Partial<Game>) {
    Object.assign(this, values);
  }

  @action clear() {
    this.name = "";
    this.maximumPlayers = 0;
    this.roundTime = 0;
    this.code = "";
    this.players = [];
    this.isStarted = false;
    this.currentRound = 0;
    this.endTimer();
  }

  @action async loadRoundSong() {
    const response = await getSong();

    if (isErrorResponse(response)) {
      message.error(response.message);
      return;
    }

    if (response.url === "FIRST_ROUND") return;

    tracks.addTrack();

    const sample = await Sample.loadFromUrl(
      response.url,
      response.url,
      tracks.tracks[0]
    );

    if (!sample) {
      message.warning("Error loading previous version of the song");
    }
  }

  @action addPlayer(player: Player) {
    this.players.push(player);
  }

  @action updatePlayer(playerToUpdate: Player) {
    this.players = this.players.map((player) => {
      if (player.name === playerToUpdate.name) {
        Object.assign(player, playerToUpdate);
      }

      return player;
    });
  }

  @action removePlayer(player: Pick<Player, "name">) {
    const playerIndex = this.players.findIndex((p) => p.name === player.name);
    if (playerIndex < 0) return;
    this.players.splice(playerIndex, 1);
  }

  private timer: NodeJS.Timer | null = null;
  @action startTimer(elapsed: number) {
    this.currentTime = elapsed;
    this.timer = setInterval(
      action(() => {
        this.currentTime += 1;
      }),
      1000
    );
  }

  @action endTimer() {
    if (this.timer) clearInterval(this.timer);
    this.currentTime = 0;
  }
}

const game = new Game();

export default game;
