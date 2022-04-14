import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Editor } from "./components/editor/editor";
import CreateRoomPage from "./pages/create-room/create-room";
import MainPage from "./pages/main-page/mainPage";
import RoomLobby from "./pages/room-lobby/room-lobby";

const App: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="/room/:code" element={<RoomLobby />} />
          <Route path="/room/:code/editor" element={<Editor />} />
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default observer(App);
