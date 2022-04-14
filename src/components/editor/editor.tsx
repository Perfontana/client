import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { start, Transport } from "tone";
import { samples } from "../../store/samples";
import tracks from "../../store/tracks";
import { Progress } from "../progress/progress";
import TrackList from "../track-line/track-line";
import EditorHeader from "./editor-header/editor-header";
import EditorMain from "./editor-main/editor-main";
import "./editor.scss";

tracks.addTrack();
tracks.addTrack();
tracks.addTrack();
tracks.addTrack();
tracks.addTrack();
tracks.addTrack();

export const Editor = observer(() => {
  return (
    <div className="editor">
      <EditorHeader />
      <EditorMain />
    </div>
  );
});
