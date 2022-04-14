import { observer } from "mobx-react-lite";
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Transport } from "tone";
import tracks from "../../../../store/tracks";
import { Progress } from "../../../progress/progress";
import TrackLine from "../../../track-line/track-line";

const EditorTrackSamples: FC = () => {
  const trackList = tracks.tracks.map((track) => (
    <TrackLine key={track.id} track={track} />
  ));

  const [seconds, setSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(Transport.seconds);
    }, 20);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick: MouseEventHandler = useCallback((event) => {
    if (!containerRef.current) return;

    if (event.button === 0) {
      const containerWidth = containerRef.current.clientWidth;

      const box = containerRef.current.getBoundingClientRect();

      Transport.seconds = ((event.clientX - box.left) / containerWidth) * 30;
    }
  }, []);

  return (
    <div ref={containerRef} onClick={handleClick} className="track-list">
      {trackList} <Progress seconds={seconds} />
    </div>
  );
};

export default observer(EditorTrackSamples);
