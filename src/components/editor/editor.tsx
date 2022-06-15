import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendSong } from "../../api/rooms";
import { render } from "../../audio/RenderAudio";
import { useGameConnection } from "../../hooks/connectToGame";
import { socketConnection } from "../../socket";
import game from "../../store/game";
import EditorHeader from "./editor-header/editor-header";
import EditorMain from "./editor-main/editor-main";
import "./editor.scss";

export const Editor = observer(() => {
  const navigate = useNavigate();

  useGameConnection();

  const onRoundEnded = useCallback(async () => {
    const data = await render();

    sendSong(data);
  }, []);

  const onGameEnded = useCallback(() => {
    navigate(`/room/${game.code}/results`);
  }, []);

  useEffect(() => {
    socketConnection.on("round-timer-ended", onRoundEnded);
    socketConnection.on("game-ended", onGameEnded);
    return () => {
      socketConnection.off("round-timer-ended", onRoundEnded);
      socketConnection.off("game-ended", onGameEnded);
    };
  }, []);

  return (
    <div className="editor">
      <EditorHeader />
      <EditorMain />
    </div>
  );
});
