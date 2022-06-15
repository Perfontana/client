import { action, makeObservable, observable } from "mobx";
import { Track } from "../audio/Track";

class Tracks {
  @observable
  tracks: Track[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  addTrack() {
    const track = new Track();

    track.channel.toDestination();

    this.tracks.push(track);
  }

  @action removeTrack(track: Track) {
    const samples = [...track.samples];

    samples.forEach((sample) => {
      sample.remove();
    });

    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  @action clear() {
    this.tracks.forEach((track) => this.removeTrack(track));
  }
}

const tracks = new Tracks();

export default tracks;
