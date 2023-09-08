import { currentPlayer } from "../types";
import { PlayableCharacter } from "./Character";
import { Tile, ValorantMap } from "./Map";
import { ASTRA, BREACH, RAZE } from "./data";
import { currentPlayingPlayer } from "./server";

class GameState {
  map: ValorantMap;

  constructor() {
    this.map = this.newMap();
  }
  private newMap() {
    const tiles = [];

    for (let i = 0; i < 50; i++) {
      const column = [];
      for (let j = 0; j < 50; j++) {
        column.push(new Tile({ x: i, y: j }));
      }
      tiles.push(column);
    }
    return new ValorantMap(tiles);
  }
  reset() {
    this.map = this.newMap();
    currentPlayingPlayer.army = [];

    currentPlayer.army = [ASTRA, RAZE, BREACH];

    currentPlayer.army.forEach((char, i) => {
      currentPlayingPlayer.army.push(
        new PlayableCharacter(char.info, {
          x: i,
          y: 0,
        })
      );
    });
  }
}
export const gameState = new GameState();
