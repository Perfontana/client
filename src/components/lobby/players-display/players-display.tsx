import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import game from "../../../store/game";
import PlayerCard from "./player-card/player-card";

import "./players-display.scss";

const PlayersDisplay: FC = () => {
  return (
    <div className="lobby-players">
      <Title level={3}>Players</Title>
      {game.players.map((player) => (
        <PlayerCard key={player.name} player={player} />
      ))}
    </div>
  );
};

export default observer(PlayersDisplay);
