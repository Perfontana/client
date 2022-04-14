import { CrownFilled, StopFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Text from "antd/lib/typography/Text";
import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import { removePlayer } from "../../../../api/rooms";
import auth from "../../../../store/auth";
import game from "../../../../store/game";
import Player from "../../../../types/Player";
import "./player-card.scss";

const PlayerCard: FC<{ player: Player }> = ({ player }) => {
  const onRemoveClick = useCallback(async (playerName: string) => {
    await removePlayer(game.code, playerName);
  }, []);

  return (
    <div
      className={`player-card ${
        player.isOnline ? "player-card-online" : "player-card-offline"
      }`}
    >
      <Avatar className="player-card-avatar" icon={<UserOutlined />} />
      <Text className="player-card-name" strong>
        {player.name}
      </Text>
      {player.isOwner && <CrownFilled className="player-card-owner" />}
      {game.isOwner(auth.name) && (
        <Button
          className="player-card-remove-button"
          onClick={() => onRemoveClick(player.name)}
          icon={<StopFilled />}
        />
      )}
    </div>
  );
};

export default observer(PlayerCard);
