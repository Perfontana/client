/* eslint-disable no-restricted-globals */
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row } from "antd";
import Joi from "joi";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { createRoom, CreateRoomType } from "../../api/rooms";
import auth from "../../store/auth";
import "./create-room.scss";

const roomSchema = Joi.object().keys({
  maximumPlayers: Joi.number().min(2).max(16).required(),
  roundTime: Joi.number().min(60).max(180).required(),
  players: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().min(3).max(15).required(),
      })
    )
    .required()
    .min(1)
    .max(1),
});

const CreateRoomPage: FC = () => {
  const { handleSubmit, control } = useForm<CreateRoomType>({
    resolver: joiResolver(roomSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: CreateRoomType) => {
    const { code, token } = await createRoom(data);
    auth.set({ name: data.players[0].name, room: code, token });
    navigate(`/room/${code}`);
  };

  return (
    <Row className="create-room" align="middle" justify="center">
      <Form
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="Number of players">
          <Controller
            name="maximumPlayers"
            control={control}
            render={({ field }) => <Input {...field} type="number" />}
          />
        </Form.Item>

        <Form.Item label="Round time">
          <Controller
            name="roundTime"
            control={control}
            render={({ field }) => <Input {...field} type="number" />}
          />
        </Form.Item>

        <Form.Item label="Player name">
          <Controller
            name="players.0.name"
            control={control}
            render={({ field }) => <Input {...field} type="text" />}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create room
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default observer(CreateRoomPage);
