import { CharacterInfo, Vector2 } from "../types";
import { gameState } from "./GameState";
import { CharacterAbility } from "./Habilities";
import { GameObject, Tile } from "./Map";

export class Character {
  info: CharacterInfo;
  constructor(info: CharacterInfo) {
    this.info = info;
  }
}

export class PlayableCharacter extends GameObject {
  info: CharacterInfo;

  selectedAbility: CharacterAbility | null = null;
  selectAbility(ability: CharacterAbility) {
    this.selectedAbility = ability;
    ability.select(this);
  }
  constructor(charInfo: CharacterInfo, position: Vector2) {
    super(position, "character");
    this.info = charInfo;
    this.position = position;
    this.move(this.position, gameState.map.tiles);
  }

  move(position: Vector2, tiles: Tile[][]) {
    tiles[this.position.x][this.position.y].remove(this);
    tiles[position.x][position.y].add(this);

    // for tailwind you need to put the name of the character
    tiles[position.x][position.y].color = this.info.name;

    this.position = position;
  }
}
