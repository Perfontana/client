import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Form, Modal } from "antd";
import Joi from "joi";
import { autorun } from "mobx";
import Input from "rc-input";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateRoom } from "../../api/rooms";
import auth from "../../store/auth";
import game from "../../store/game";
import Room from "../../types/Room";
import { ErrorMessage } from "../error-message/error-message";

const roomSchema = Joi.object().keys({
  maximumPlayers: Joi.number().min(2).max(16).required(),
  roundTime: Joi.number().min(60).max(180).required(),
});

const RoomSettingsModal = ({
  isOpened,
  setVisibility,
}: {
  isOpened: boolean;
  setVisibility: (value: boolean) => void;
}) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<{ maximumPlayers: number; roundTime: number }>({
    resolver: joiResolver(roomSchema),
    defaultValues: useMemo(
      () => ({
        maximumPlayers: game.maximumPlayers,
        roundTime: game.roundTime,
      }),
      [game]
    ),
  });

  useEffect(() => {
    const close = autorun(() =>
      reset({
        maximumPlayers: game.maximumPlayers,
        roundTime: game.roundTime,
      })
    );
    return close;
  }, []);

  const isOwner = game.isOwner(auth.name);

  const onSubmit = async (values: any) => {
    if (isOwner) await updateRoom(values);
    setVisibility(false);
  };

  return (
    <Modal
      footer={false}
      visible={isOpened}
      onCancel={() => setVisibility(false)}
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Maximum players">
          <Controller
            name="maximumPlayers"
            control={control}
            render={({ field }) => (
              <Input
                disabled={!isOwner}
                className={`${errors?.maximumPlayers && "error"}`}
                {...field}
                type="number"
              />
            )}
          />
          {errors.maximumPlayers && (
            <ErrorMessage error={errors} field="maximumPlayers" />
          )}
        </Form.Item>

        <Form.Item label="Round time">
          <Controller
            name="roundTime"
            control={control}
            render={({ field }) => (
              <Input
                disabled={!isOwner}
                className={` ${errors?.roundTime && "error"}`}
                placeholder="Player name"
                {...field}
                type="number"
              />
            )}
          />
          {errors.roundTime && (
            <ErrorMessage error={errors} field="roundTime" />
          )}
        </Form.Item>

        {isOwner && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default RoomSettingsModal;
