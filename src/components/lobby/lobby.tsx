import { Row, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import auth from "../../store/auth";
import game from "../../store/game";
import LobbyOptions from "./lobby-options/lobby-options";
import "./lobby.scss";
import PlayersDisplay from "./players-display/players-display";

const Lobby: FC<{ roomCode: string }> = ({ roomCode }) => {
  useEffect(() => {
    game.loadRoom(roomCode);
    game.connect(auth.token);
    return () => {
      game.clear();
      game.disconnect();
    };
  }, [roomCode]);

  return (
    <Row align="middle" justify="center" className="container-fullscreen">
      <div className="room-lobby-card">
        {game.loading ? (
          <Spin />
        ) : (
          <>
            <PlayersDisplay />
            <LobbyOptions />
          </>
        )}
      </div>
    </Row>
  );
};

export default observer(Lobby);
