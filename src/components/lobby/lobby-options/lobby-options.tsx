import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import auth from "../../../store/auth";
import game from "../../../store/game";

const LobbyOptions: FC = () => {
  const startGame = useCallback(() => {
    game.start();
  }, []);

  return (
    <div className="lobby-options">
      <Title level={3}>{game.name}</Title>
      {game.isOwner(auth.name) && <Button onClick={startGame}>Start</Button>}
    </div>
  );
};

export default observer(LobbyOptions);
