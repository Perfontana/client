import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Track } from "../../../../audio/Track";
import tracks from "../../../../store/tracks";
import Knob from "../../../knob/knob";
import "./editor-tracks-controls.scss";

const TrackControlPanel = observer(({ track }: { track: Track }) => {
  return (
    <div className="track-controls" key={track.id}>
      <div className="track-control">
        <label className="track-control-label">Volume</label>
        <Knob
          value={track.volume}
          onChange={(value) => {
            track.setVolume(value);
          }}
          min={-50}
          max={20}
        />
      </div>

      <div className="track-control">
        <label className="track-control-label">Pan</label>
        <Knob
          value={track.pan}
          onChange={(value) => {
            track.setPan(value);
          }}
          min={-1}
          max={1}
        />
      </div>

      <div className="track-buttons">
        <Popconfirm
          title="Delete track?"
          onConfirm={() => tracks.removeTrack(track)}
        >
          <Button title="Remove track" className="btn">
            <DeleteOutlined />
          </Button>
        </Popconfirm>
        <Button
          title="Toggle solo"
          style={
            track.solo
              ? {
                  backgroundColor: "yellow",
                }
              : {}
          }
          className="btn"
          onClick={() => track.setSolo(!track.solo)}
        >
          S
        </Button>
        <Button
          title="Mute track"
          style={
            track.mute
              ? {
                  backgroundColor: "red",
                }
              : {}
          }
          className="btn"
          onClick={() => track.setMute(!track.mute)}
        >
          M
        </Button>
      </div>
    </div>
  );
});

const EditorTracksControls: FC = () => {
  return (
    <div className="editor-tracks-controls">
      {tracks.tracks.map((track) => {
        return <TrackControlPanel track={track} key={track.id} />;
      })}
      <Button className="add-track-btn btn" onClick={() => tracks.addTrack()}>
        Add track
      </Button>
    </div>
  );
};

export default observer(EditorTracksControls);
