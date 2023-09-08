import { CharacterInfo, Vector2 } from "../types";
import { CharacterAbility } from "./Habilities";
import { GameObject, Tile } from "./Map";

class CharacterHabilities {
  abilities: CharacterAbility[];
  selectedAbility: CharacterAbility | null = null;
  constructor(abilities: CharacterAbility[]) {
    this.abilities = abilities;
  }
}

export class Character {
  private _info: CharacterInfo;
  private habilites: CharacterHabilities;
  constructor(info: CharacterInfo) {
    this._info = info;

    this.habilites = new CharacterHabilities(info.habilities);
  }

  get info(): CharacterInfo {
    return {
      ...this._info,
    };
  }
}

export class PlayableCharacter implements GameObject {
  position: Vector2;
  type: string = "character";
  info: CharacterInfo;
  constructor(charInfo: CharacterInfo, position: Vector2) {
    this.info = charInfo;
    this.position = position;
  }

  move(position: Vector2, tiles: Tile[][]) {
    tiles[this.position.x][this.position.y].remove(this);
    tiles[position.x][position.y].add(this);
    this.position = position;
  }
}
