import Player from "./Player";

export default interface Room {
  code: string;
  name: string;
  maximumPlayers: number;
  roundTime: number;
  players: Player[];
  isStarted: boolean;
  isEnded: boolean;
  rounds: {
    player: string;
    song: string;
    sent: boolean;
  }[][];
  songs: Record<string, { player: string; url: string }[]>;
  currentRound: number;
}
