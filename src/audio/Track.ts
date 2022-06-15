import { action, makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";
import { Channel } from "tone";
import { Sample } from "./Sample";

export class Track {
  id = nanoid(10);
  channel = new Channel(0, 0);
  @observable
  samples: Sample[] = [];
  @observable volume: number = 0;
  @observable pan: number = 0;
  @observable solo: boolean = false;
  @observable mute: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action setVolume(value: number) {
    this.volume = value;
    this.channel.volume.value = value;
  }

  @action setPan(value: number) {
    this.pan = value;
    this.channel.pan.value = value;
  }

  @action setMute(value: boolean) {
    this.mute = value;
    this.channel.mute = value;
  }

  @action setSolo(value: boolean) {
    this.solo = value;
    this.channel.solo = value;
  }

  @action
  addSample(sample: Sample) {
    this.samples.push(sample);
  }

  @action
  removeSample(sample: Sample) {
    const sampleIndex = this.samples.indexOf(sample);
    if (sampleIndex >= 0) this.samples.splice(this.samples.indexOf(sample), 1);
  }
}
