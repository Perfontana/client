import { Tooltip } from "antd";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./knob.scss";

const MIN_ANGLE = 0;
const MAX_ANGLE = 180;
const MOUSE_MIN_DELTA = -50;
const MOUSE_MAX_DELTA = 50;

const changeRange = (
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number
) => ((value - min) / (max - min)) * (newMax - newMin) + newMin;

const getRotation = (value: number, min: number, max: number) =>
  changeRange(value, min, max, MIN_ANGLE, MAX_ANGLE);

const getValue = (angle: number, min: number, max: number) =>
  changeRange(angle, MIN_ANGLE, MAX_ANGLE, min, max);

const Knob = ({
  onChange,
  value,
  min = 0,
  max = 1,
}: {
  onChange: (value: number) => void;
  value: number;
  min?: number;
  max?: number;
}) => {
  const [rotation, setRotation] = useState(getRotation(value, min, max));
  const [isDragging, setIsDragging] = useState(false);

  const knobRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      let newRotation = rotation - e.movementY;

      if (newRotation < MIN_ANGLE) newRotation = MIN_ANGLE;
      if (newRotation > MAX_ANGLE) newRotation = MAX_ANGLE;

      setRotation(newRotation);
      onChange(getValue(newRotation, min, max));
    },
    [rotation, min, max, onChange]
  );

  const onMouseUp = useCallback<EventListener>(
    (e) => {
      document.exitPointerLock();
      setIsDragging(false);
    },
    [onMouseMove]
  );

  const onClick = useCallback<MouseEventHandler>(
    (e) => {
      knobRef.current && knobRef.current.requestPointerLock();
      setIsDragging(true);
    },
    [onMouseMove, onMouseUp]
  );

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging, rotation]);

  const style = { transform: `rotate(${rotation}deg)` };

  return (
    <Tooltip visible={isDragging} title={value.toFixed(2)}>
      <div ref={knobRef} className="knob" onMouseDown={onClick}>
        <div style={style} className="knob-circle">
          <span className="knob-indicator"></span>
        </div>
      </div>
    </Tooltip>
  );
};

export default Knob;
