import { useEffect } from "react";
import { getCurrentTime } from "../api/rooms";
import { socketConnection } from "../socket";
import auth from "../store/auth";
import game from "../store/game";

export const useGameConnection = () => {
  useEffect(() => {
    game.loadRoom();

    socketConnection.connect(auth.token);
    return () => {
      game.clear();
      socketConnection.disconnect();
    };
  }, []);
};
