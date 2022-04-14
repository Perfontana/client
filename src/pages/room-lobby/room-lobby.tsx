import { Modal, Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConnectToRoomForm from "../../components/connect-to-room-form/connect-to-room-form";
import Lobby from "../../components/lobby/lobby";
import auth from "../../store/auth";
import game from "../../store/game";

const RoomLobby = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (game.isStarted) navigate(`/room/${code}/editor`);
  }, [game.isStarted, navigate, code]);

  return (
    <div className="lobby">
      <Modal title="Please write your name" visible={!auth.token}>
        <ConnectToRoomForm roomCode={code || ""} />
      </Modal>
      {!auth.token ? <Spin /> : <Lobby roomCode={code || ""} />}
    </div>
  );
};

export default observer(RoomLobby);
