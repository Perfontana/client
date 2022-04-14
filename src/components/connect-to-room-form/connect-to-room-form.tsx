import { joiResolver } from "@hookform/resolvers/joi";
import { Form, Input } from "antd";
import Joi from "joi";
import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { joinRoom } from "../../api/rooms";
import auth from "../../store/auth";
import Player from "../../types/Player";

const playerSchema = Joi.object().keys({
  name: Joi.string().min(3).max(15).required(),
});

const ConnectToRoomForm: FC<{ roomCode: string }> = ({ roomCode }) => {
  const { handleSubmit, control } = useForm<Pick<Player, "name">>({
    resolver: joiResolver(playerSchema),
  });

  const onSubmit = useCallback(
    async (player: Pick<Player, "name">) => {
      const { token } = await joinRoom(roomCode, player);
      auth.set({ name: player.name, room: roomCode, token });
    },
    [roomCode]
  );

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Name">
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} type="text" />}
        />
      </Form.Item>
    </Form>
  );
};

export default observer(ConnectToRoomForm);
