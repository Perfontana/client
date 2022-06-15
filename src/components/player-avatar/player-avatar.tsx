import { Avatar, AvatarProps } from "antd";
import { observer } from "mobx-react-lite";
import Player from "../../types/Player";
import "./player-avatar.scss";

interface PlayerAvatarProps {
  player: Player;
  options: AvatarProps;
}

const PlayerAvatar = ({ player, options }: PlayerAvatarProps) => {
  return (
    <Avatar
      style={player.isOnline ? { backgroundColor: "green" } : {}}
      className="player-avatar"
      {...options}
    />
  );
};

export default observer(PlayerAvatar);
