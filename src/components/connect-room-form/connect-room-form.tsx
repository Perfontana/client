import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Form, Input } from "antd";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import Player from "../../types/Player";
import { ErrorMessage } from "../error-message/error-message";

import "./connect-room-form.scss";

const roomSchema = Joi.object().keys({
  name: Joi.string().min(3).max(15).required().messages({
    "string.min": "Name is too short",
    "string.max": "Name is too long",
    "any.required": "Should not be empty",
    "any.empty": "Should not be empty",
  }),
});

interface ConnectRoomFormProps {
  onSubmit: (player: Player) => any;
}

export const ConnectRoomForm = ({ onSubmit }: ConnectRoomFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Player>({
    resolver: joiResolver(roomSchema),
  });

  return (
    <Form className="connect-room-form" onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              className={`connect-room-form-input input ${
                errors?.name && "error"
              }`}
              placeholder="Player name"
              {...field}
              type="text"
            />
          )}
        />
        {errors.name && <ErrorMessage error={errors} field="name" />}
      </Form.Item>

      <Form.Item>
        <Button
          className="connect-room-form-submit button"
          type="primary"
          htmlType="submit"
        >
          Connect to room
        </Button>
      </Form.Item>
    </Form>
  );
};
