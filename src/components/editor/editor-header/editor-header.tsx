import {
  AudioOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
  StopFilled,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { sendSong } from "../../../api/rooms";
import { render } from "../../../audio/RenderAudio";
import { sound } from "../../../audio/sound";
import { socketConnection } from "../../../socket";
import game from "../../../store/game";

import "./editor-header.scss";

const EditorHeader = () => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const closeModal = () => setModalVisibility(false);

  useEffect(() => {
    socketConnection.on("round-started", closeModal);
    return () => {
      socketConnection.off("round-started", closeModal);
    };
  }, []);

  const onPlayPauseClick = () => {
    if (sound.isPaused) {
      Tone.start();
      sound.play();
      return;
    }

    sound.pause();
  };

  return (
    <div className="editor-header">
      <div className="sound-controls">
        <Button
          className="btn sound-btn play-btn"
          title={sound.isPaused ? "Play" : "Pause"}
          disabled={sound.isRecording}
          onClick={onPlayPauseClick}
          icon={sound.isPaused ? <PlayCircleFilled /> : <PauseCircleFilled />}
        />
        <Button
          className="btn sound-btn"
          title="Stop"
          disabled={sound.isRecording}
          onClick={sound.stop}
          icon={<StopFilled />}
        />
        <Button
          className="btn sound-btn"
          title={sound.isRecording ? "Stop recording" : "Start recording"}
          onClick={async (e) => {
            // have to call it in event handler
            await Tone.start();

            if (!sound.isRecording) {
              await sound.startRecording();
              return;
            }

            await sound.stopRecording();
          }}
          icon={<AudioOutlined />}
        />
      </div>

      {game.currentTime < game.roundTime && (
        <div
          className="round-time"
          style={{ flex: game.currentTime / game.roundTime }}
        ></div>
      )}

      {game.currentTime >= game.roundTime && <h3>Round ended</h3>}

      <Button
        className="btn sound-btn send-btn"
        disabled={sound.isRecording}
        onClick={async () => {
          const data = await render();

          sendSong(data);

          setModalVisibility(true);
        }}
        icon={<CheckOutlined />}
      />

      <Modal
        visible={isModalVisible}
        title="Waiting for other players..."
        footer={false}
      >
        <h1>You've sent you song. Now waiting for other players...</h1>
      </Modal>
    </div>
  );
};

export default observer(EditorHeader);
