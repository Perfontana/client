import { Button, Row, Spin } from "antd";
import { toJS, autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useGameConnection } from "../../hooks/connectToGame";
import auth from "../../store/auth";
import game from "../../store/game";
import LobbyOptions from "./lobby-options/lobby-options";
import "./lobby.scss";
import PlayersDisplay from "./players-display/players-display";

const Lobby = () => {
  useGameConnection();

  return (
    <Row align="middle" justify="center" className="room-lobby">
      {game.loading ? (
        <Spin size="large" />
      ) : (
        <>
          <LobbyOptions />
          {game.players.length && <PlayersDisplay />}
        </>
      )}
    </Row>
  );
};

export default observer(Lobby);
