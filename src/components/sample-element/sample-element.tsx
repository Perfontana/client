import { observer } from "mobx-react-lite";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Time } from "tone";
import { Sample } from "../../audio/Sample";
import { useDrag, useDragDropManager } from "react-dnd";
import { runInAction } from "mobx";
import { Track } from "../../audio/Track";

export const SampleElement = observer(
  ({
    sample,
    trackWidth,
    track,
    trackLeftOffset,
  }: {
    sample: Sample;
    trackWidth: number;
    track: Track;
    trackLeftOffset: number;
  }) => {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();

    useEffect(
      () =>
        monitor.subscribeToOffsetChange(() => {
          const initialMouseOffset = monitor.getInitialClientOffset();
          const initialSampleOffset = monitor.getInitialSourceClientOffset();
          const currentMouse = monitor.getClientOffset();
          const draggedSample = monitor.getItem();

          if (
            monitor.getItemType() !== "sample" ||
            !initialMouseOffset ||
            !currentMouse ||
            !initialSampleOffset ||
            !draggedSample
          )
            return;

          let position = Math.max(
            ((initialSampleOffset.x +
              currentMouse.x -
              initialMouseOffset.x -
              trackLeftOffset) /
              trackWidth) *
              30,
            0
          );

          position = Math.min(position, 30 - sample.fullLength);

          runInAction(() => draggedSample.set({ position }));
        }),
      [monitor]
    );

    const [_, dragRef] = useDrag(
      () => ({
        type: "sample",
        item: sample,
      }),
      [track]
    );

    const secondsShift = useMemo(
      () => Time(sample.position).toSeconds(),
      [sample.position]
    );

    const duration = useMemo(() => sample.length, [sample.length]);

    return (
      <div
        ref={dragRef}
        style={{
          position: "absolute",
          left: `${(secondsShift / 30) * 100}%`,
          width: `${(duration / 30) * 100}%`,
          height: "50px",
        }}
      >
        <div
          style={{
            color: "white",
            width: `100%`,
            height: "100%",
            backgroundColor: "#3f3f3f",
          }}
        >
          {sample.id}
        </div>
      </div>
    );
  }
);
