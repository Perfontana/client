import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import { Sample } from "../../audio/Sample";
import { Track } from "../../audio/Track";
import tracks from "../../store/tracks";
import { SampleElement } from "../sample-element/sample-element";
import "./track-list.scss";

const TrackLine: FC<{ track: Track }> = observer(({ track }) => {
  const samplesContainer = useRef<HTMLDivElement>(null);

  const [_, dropContainer] = useDrop(
    {
      accept: "sample",
      hover(sample: Sample | null) {
        if (!sample || sample.track === track) return;
        runInAction(() => sample.connectToTrack(track));
      },
    },
    []
  );

  return (
    <div ref={dropContainer} className="track-list-drop-area">
      <div ref={samplesContainer} className="track-list-line">
        {track.samples.map((sample) => (
          <SampleElement
            key={sample.id}
            track={track}
            sample={sample}
            trackLeftOffset={
              samplesContainer.current?.getBoundingClientRect().left || 0
            }
            trackWidth={samplesContainer.current?.clientWidth || 0}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackLine;
