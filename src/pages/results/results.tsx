import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import game from "../../store/game";

const Results = observer(() => {
  useEffect(() => {
    game.loadRoom();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {game.songs &&
        Object.entries(game.songs).map(([player, song]) => {
          return (
            <div key={player} style={{ marginTop: "5%", width: "100%" }}>
              <h1>{player} song</h1>
              {song.map((iteration) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "1%",
                  }}
                  key={iteration.url}
                >
                  <Row style={{ width: "100%" }}>
                    <Col span={12}>
                      <audio controls src={iteration.url}></audio>
                    </Col>
                    <Col span={5}>
                      <div style={{ fontSize: "20px", marginLeft: "1%" }}>
                        made by {iteration.player}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          );
        })}{" "}
    </div>
  );
});

export default Results;
