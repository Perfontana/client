import { Button } from "antd";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { useDrag, useDragDropManager } from "react-dnd";
import { Time } from "tone";
import { Sample } from "../../audio/Sample";
import { Track } from "../../audio/Track";
import waveforms from "../../store/waveforms";
import "./sample-element.scss";
import { CloseCircleOutlined } from "@ant-design/icons";

const SampleButton = ({
  icon,
  onClick,
}: {
  onClick: () => void;
  icon: ReactElement;
}) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="btn sample-button"
    >
      {icon}
    </Button>
  );
};

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

          position = Math.min(position, 30 - sample.length);

          runInAction(() => draggedSample.set({ position }));
        }),
      [monitor, trackWidth, trackLeftOffset]
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
        onClick={(e) => {
          sample.cut(
            ((e.screenX - trackLeftOffset - window.screenX) / trackWidth) * 30
          );
        }}
        ref={dragRef}
        style={{
          position: "absolute",
          left: `${(secondsShift / 30) * 100}%`,
          width: `${(duration / 30) * 100}%`,
        }}
        className="sample-element"
      >
        <div className="sample-controls">
          <SampleButton
            icon={<CloseCircleOutlined />}
            onClick={() => sample.remove()}
          />
        </div>
        <SampleWaveform
          sample={sample}
          trackWidth={trackWidth}
          duration={duration}
        />
      </div>
    );
  }
);

const SampleWaveform = observer(
  ({
    sample,
    duration,
    trackWidth,
  }: {
    sample: Sample;
    duration: number;
    trackWidth: number;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawWaveform = useCallback(() => {
      if (canvasRef.current) {
        waveforms.drawWaveform(
          sample,
          canvasRef.current,
          (duration / 30) * trackWidth
        );
      }
    }, [sample, duration, trackWidth]);

    useEffect(drawWaveform, [sample, duration, trackWidth]);

    return <canvas className="sample-waveform" ref={canvasRef}></canvas>;
  }
);
