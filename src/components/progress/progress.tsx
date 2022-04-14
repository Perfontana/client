import { MouseEventHandler, useCallback, useRef } from "react";

import "./progress.scss";

export const Progress = ({ seconds }: { seconds: number }) => {
  return (
    <div
      className="progress"
      style={{ left: `calc(100% / 30 * ${seconds})` }}
    ></div>
  );
};
