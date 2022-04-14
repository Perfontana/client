import { action, makeObservable, observable, runInAction } from "mobx";
import { joinRoom } from "../api/rooms";
import Player from "../types/Player";
import { autoSave } from "./autosave";

class Auth {
  @observable loading: boolean = false;
  @observable error: any = "";

  @observable token: string = "";
  @observable name: string = "";
  @observable room: string = "";

  constructor() {
    makeObservable(this);
    autoSave(this, "auth");
  }

  @action set(values: Partial<Auth>) {
    Object.assign(this, values);
  }

  @action clear() {
    this.token = "";
    this.name = "";
    this.room = "";
  }

  @action async connectToRoom(roomCode: string, player: Pick<Player, "name">) {
    this.loading = true;

    try {
      const { token } = await joinRoom(roomCode, player);
      runInAction(() => {
        this.set({ token, room: roomCode, name: player.name, loading: false });
      });
    } catch (e) {
      runInAction(() => this.set({ loading: false, error: e }));
    }
  }
}

const auth = new Auth();

export default auth;
