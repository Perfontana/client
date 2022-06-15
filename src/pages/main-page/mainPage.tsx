import { Col, message, Row } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { isErrorResponse } from "../../api/base";
import { createRoom } from "../../api/rooms";
import { ConnectRoomForm } from "../../components/connect-room-form/connect-room-form";
import auth from "../../store/auth";
import Player from "../../types/Player";
import "./mainPage.scss";

const MainPage: FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (player: Player) => {
    const response = await createRoom({ players: [player] });

    if (isErrorResponse(response)) {
      message.error(response.message);
      return;
    }

    auth.set({ name: player.name, room: response.code, token: response.token });
    navigate(`/room/${response.code}`);
  };

  return (
    <Row className="main-page-container" align="middle" justify="center">
      <Col flex="auto">
        <Row justify="center">
          <Col>
            <h2>Create a new room and invite friends!</h2>
            <ConnectRoomForm onSubmit={onSubmit} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default observer(MainPage);
