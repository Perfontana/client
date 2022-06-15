import { Row } from "antd";
import Title from "antd/lib/typography/Title";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useMemo } from "react";
import game from "../../../store/game";
import PlayerCard from "./player-card/player-card";

import "./players-display.scss";

const PlayersDisplay: FC = () => {
  const owner = useMemo(
    () => game.players.find((player) => player.isOwner),
    [game.players]
  );

  return (
    <section className="lobby-players">
      <Row justify="center" className="lobby-players-owner">
        <PlayerCard key={owner?.name} player={owner!} />
      </Row>
      <Row justify="center">
        {game.players.map((player) =>
          player.isOwner ? null : (
            <PlayerCard key={player.name} player={player} />
          )
        )}
      </Row>
    </section>
  );
};

export default observer(PlayersDisplay);
