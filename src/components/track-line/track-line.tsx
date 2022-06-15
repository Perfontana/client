import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Sample } from "../../audio/Sample";
import { Track } from "../../audio/Track";
import useElementDimentions from "../../hooks/useElementDimentions";
import { SampleElement } from "../sample-element/sample-element";
import "./track-list.scss";

const TrackLine: FC<{ track: Track }> = observer(({ track }) => {
  const samplesContainer = useRef<HTMLDivElement>(null);

  const { clientWidth: trackWidth, clientRect } =
    useElementDimentions(samplesContainer);

  const trackLeftOffset = clientRect?.left || 0;

  const [_, dropContainer] = useDrop(
    {
      accept: ["sample", NativeTypes.FILE],
      hover(sample: Sample | null, monitor) {
        switch (monitor.getItemType()) {
          case "sample": {
            if (!sample || sample.track === track) return;
            runInAction(() => sample.connectToTrack(track));
            break;
          }
        }
      },
      drop(item: any, monitor) {
        let position = monitor.getClientOffset()?.x || 0;

        position = Math.max(
          ((position - trackLeftOffset) / trackWidth) * 30,
          0
        );

        switch (monitor.getItemType()) {
          case NativeTypes.FILE: {
            Sample.loadFromFile(item.files[0] as File, track, position);
            break;
          }
        }
      },
    },
    [trackLeftOffset, trackWidth]
  );

  return (
    <div ref={dropContainer} className="track-list-drop-area">
      <div ref={samplesContainer} className="track-list-line">
        {track.samples.map((sample) => (
          <SampleElement
            key={sample.id}
            track={track}
            sample={sample}
            trackLeftOffset={trackLeftOffset}
            trackWidth={trackWidth}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackLine;
