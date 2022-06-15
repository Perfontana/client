import { message } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import { isErrorResponse } from "../../api/base";
import { joinRoom } from "../../api/rooms";
import auth from "../../store/auth";
import Player from "../../types/Player";
import { ConnectRoomForm } from "../connect-room-form/connect-room-form";

const ConnectToRoomModal: FC<{ roomCode: string }> = ({ roomCode }) => {
  const onSubmit = useCallback(
    async (player: Pick<Player, "name">) => {
      const response = await joinRoom(roomCode, player);

      if (isErrorResponse(response)) {
        message.error(response.message);
        return;
      }

      auth.set({ name: player.name, room: roomCode, token: response.token });
    },
    [roomCode]
  );

  return <ConnectRoomForm onSubmit={onSubmit} />;
};

export default observer(ConnectToRoomModal);
