import { Button, Col, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./mainPage.scss";

const MainPage: FC = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  return (
    <Row className="main-page-container" align="middle" justify="center">
      <Col flex="auto">
        <Row justify="center">
          <Col>
            <Title>
              <Link to={"/create-room"}>create a new game</Link>
            </Title>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default observer(MainPage);
