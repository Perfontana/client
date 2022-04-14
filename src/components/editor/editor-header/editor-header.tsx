import { Button } from "antd";
import {
  PlayCircleFilled,
  PauseCircleFilled,
  StopFilled,
  PlusCircleFilled,
} from "@ant-design/icons";

import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { start, Transport } from "tone";
import { samples } from "../../../store/samples";
import tracks from "../../../store/tracks";

const EditorHeader = () => {
  return (
    <div>
      <Button
        onClick={(e) => {
          start();
          Transport.start();
        }}
        icon={<PlayCircleFilled />}
      />
      <Button
        onClick={(e) => {
          Transport.pause();
        }}
        icon={<PauseCircleFilled />}
      />
      <Button
        onClick={(e) => {
          Transport.stop();
        }}
        icon={<StopFilled />}
      />
      <Button
        onClick={action((e) => {
          samples.createSample(
            String(Date.now()),
            tracks.tracks[0],
            "https://tonejs.github.io/audio/loop/kick.mp3"
          );
        })}
        icon={<PlusCircleFilled />}
      />
    </div>
  );
};

export default observer(EditorHeader);
