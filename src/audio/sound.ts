import { action, makeObservable, observable, runInAction } from "mobx";
import { Recorder, start, Transport, UserMedia } from "tone";
import tracks from "../store/tracks";
import { Sample } from "./Sample";

export class Sound {
  private microphone: UserMedia | null = null;
  private recorder: Recorder | null = null;
  private startPosition = 0;

  @observable isPaused = true;
  @observable isRecording = false;

  constructor() {
    makeObservable(this);
  }

  @action
  play() {
    this.isPaused = false;
    Transport.start();
  }

  @action
  pause() {
    this.isPaused = true;
    Transport.pause();
  }

  @action
  stop() {
    this.isPaused = true;
    Transport.stop();
  }

  get position() {
    return Transport.seconds;
  }

  @action
  async startRecording() {
    this.microphone = new UserMedia();
    await this.microphone.open();

    runInAction(() => {
      this.recorder = new Recorder();
      this.microphone!.connect(this.recorder);

      this.startPosition = this.position;
      this.isRecording = true;

      this.recorder.start();
      this.play();
    });
  }

  @action
  async stopRecording() {
    this.pause();

    const recording = await this.recorder!.stop();

    runInAction(() => {
      this.microphone?.close();

      this.isRecording = false;

      Sample.loadFromFile(recording, tracks.tracks[0], this.startPosition);
    });
  }
}

export const sound = new Sound();
