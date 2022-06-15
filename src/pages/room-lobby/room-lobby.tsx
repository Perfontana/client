import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConnectToRoomModal from "../../components/connect-to-room-modal/connect-to-room-modal";
import Lobby from "../../components/lobby/lobby";
import { socketConnection } from "../../socket";
import auth from "../../store/auth";

const RoomLobby = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const onRoundStart = useCallback(() => {
    navigate(`/room/${code}/editor`);
  }, [code]);

  useEffect(() => {
    socketConnection.on("round-started", onRoundStart);

    return () => {
      socketConnection.on("round-started", onRoundStart);
    };
  }, [onRoundStart]);

  return (
    <div className="lobby">
      <Modal
        title="Please write your name"
        closable={false}
        footer={null}
        visible={!auth.token}
      >
        <ConnectToRoomModal roomCode={code || ""} />
      </Modal>
      {!auth.token ? null : <Lobby />}
    </div>
  );
};

export default observer(RoomLobby);
