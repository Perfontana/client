import { Button } from "antd";
import {
  PlayCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useState } from "react";
import auth from "../../../store/auth";
import game from "../../../store/game";
import Text from "antd/lib/typography/Text";

import "./lobby-options.scss";
import { removePlayer } from "../../../api/rooms";
import { socketConnection } from "../../../socket";
import RoomSettingsModal from "../../room-settings-modal/room-settings-modal";

const LobbyOptions: FC = () => {
  const [isSettingsVisible, setSettingsVisibility] = useState(false);

  const startGame = useCallback(() => {
    game.start();
  }, []);

  const quitGame = useCallback(async () => {
    await removePlayer(auth.name);
    game.clear();
    socketConnection.disconnect();
  }, []);

  const openSettings = useCallback(() => {
    setSettingsVisibility(true);
  }, []);

  return (
    <div className="lobby-options">
      <Button
        onClick={quitGame}
        className="btn round mid-icon lobby-options-close-btn"
      >
        <CloseCircleOutlined />
      </Button>

      <div className="lobby-options-middle-section">
        <Text className="lobby-options-player-count">
          {game.players.length}/{game.maximumPlayers}
        </Text>

        {game.isOwner(auth.name) && (
          <Button
            className="btn round big-icon lobby-options-play-btn"
            onClick={startGame}
          >
            <PlayCircleOutlined />
          </Button>
        )}
      </div>

      <Button
        onClick={openSettings}
        className="btn round mid-icon lobby-options-settings-btn"
      >
        <SettingOutlined />
      </Button>
      <RoomSettingsModal
        isOpened={isSettingsVisible}
        setVisibility={setSettingsVisibility}
      />
    </div>
  );
};

export default observer(LobbyOptions);
