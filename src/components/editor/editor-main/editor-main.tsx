import { Col, Progress, Row } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import EditorTracksControls from "./editor-tracks-controls/editor-tracks-controls";
import EditorTracksSamples from "./editor-tracks-samples/editor-tracks-samples";

import "./editor-main.scss";

const EditorMain: FC = () => {
  return (
    <Row className="editor-main">
      <Col xs={3}>
        <EditorTracksControls />
      </Col>
      <Col flex="auto">
        <EditorTracksSamples />
      </Col>
    </Row>
  );
};

export default observer(EditorMain);
