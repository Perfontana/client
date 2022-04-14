import { makeObservable, observable } from "mobx";
import { Merge } from "tone";
import { Track } from "../audio/Track";

class Tracks {
  master = new Merge().toDestination();

  @observable
  tracks: Track[] = [];

  constructor() {
    makeObservable(this);
  }

  addTrack() {
    const track = new Track();

    track.channel.connect(this.master);

    this.tracks.push(track);
  }

  removeTrack(track: Track) {
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }
}

const tracks = new Tracks();

export default tracks;
