import {
  CrownFilled,
  EllipsisOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import { removePlayer } from "../../../../api/rooms";
import auth from "../../../../store/auth";
import game from "../../../../store/game";
import Player from "../../../../types/Player";
import PlayerAvatar from "../../../player-avatar/player-avatar";
import "./player-card.scss";

const UserActions = (player: Player) => {
  const onRemoveClick = useCallback(async (playerName: string) => {
    await removePlayer(playerName);
  }, []);

  return (
    <Menu>
      <Menu.Item
        key="mail"
        onClick={() => onRemoveClick(player.name)}
        icon={<StopOutlined />}
      >
        Remove player
      </Menu.Item>
    </Menu>
  );
};

const PlayerCard: FC<{ player: Player }> = ({ player }) => {
  if (!player) return null;
  console.log(toJS(player));
  return (
    <div className={"player-card"}>
      {player.isOwner && <CrownFilled className="player-card-owner" />}
      <PlayerAvatar
        player={player}
        options={{
          size: { lg: 80, md: 80, sm: 80, xl: 80, xs: 80, xxl: 80 },
          icon: <UserOutlined />,
        }}
      />
      <Row align="middle">
        <Text className="player-card-name" strong>
          {player.name}
        </Text>
        {game.isOwner(auth.name) && (
          <Dropdown
            className="player-card-actions"
            overlay={UserActions(player)}
          >
            <EllipsisOutlined />
          </Dropdown>
        )}
      </Row>
    </div>
  );
};

export default observer(PlayerCard);
