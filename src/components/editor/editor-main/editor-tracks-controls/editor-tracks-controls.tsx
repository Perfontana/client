import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import tracks from "../../../../store/tracks";

import "./editor-tracks-controls.scss";

const EditorTracksControls: FC = () => {
  return (
    <div className="editor-tracks-controls">
      {tracks.tracks.map((track) => {
        return (
          <div className="track-controls" key={track.id}>
            Track {track.id}
          </div>
        );
      })}
    </div>
  );
};

export default observer(EditorTracksControls);
