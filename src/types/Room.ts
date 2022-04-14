import Player from "./Player";
import Round from "./Round";

export default interface Room {
  code: string;
  name: string;
  maximumPlayers: number;
  roundTime: number;
  players: Player[];
  isStarted: boolean;
  rounds: Round[];
  currentRound: number;
  roundsMap?: string[][];
}
