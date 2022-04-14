import { action, makeObservable, observable } from "mobx";
import { Channel } from "tone";
import { Sample } from "./Sample";

export class Track {
  id = Math.random();
  channel = new Channel();
  @observable
  samples: Sample[] = [];

  constructor() {
    makeObservable(this);
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
