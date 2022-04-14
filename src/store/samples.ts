import { action, makeObservable, observable } from "mobx";
import { Time } from "tone";
import { Sample } from "../audio/Sample";
import { Track } from "../audio/Track";
import { audioBuffers } from "./audioBuffers";

export class Samples {
  @observable
  samples: Sample[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  createSample(name: string, track: Track, url: string) {
    audioBuffers.getBuffer(name, url).then(
      action((buffer) => {
        if (!buffer) return;

        const newSample = new Sample(buffer, track, name);

        track.addSample(newSample);

        newSample.loaded = true;
        this.samples.push(newSample);
      })
    );
  }

  @action
  removeSample(sample: Sample) {
    const sampleIndex = this.samples.indexOf(sample);
    if (sampleIndex >= 0) this.samples.splice(sampleIndex, 1);
  }

  @action
  cutSample(originalSample: Sample, cutPosition: number) {
    const copy = originalSample.copy();

    const cutSampleLength = cutPosition - originalSample.position;

    if (cutSampleLength < 0.2) return;

    originalSample.set({ length: cutSampleLength });
    copy.set({
      position: cutPosition,
      offset: copy.offset + cutSampleLength,
      length: copy.length - cutSampleLength,
    });

    this.samples.push(copy);
  }
}

export const samples = new Samples();
