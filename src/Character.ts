import {
  CharacterImageType,
  CharacterInfo,
  CharacterName,
  CharacterRole,
  Vector2,
} from "../types";
import { BaseHability, HabilityFactory } from "./Habilities";
import { GameObject, Tile } from "./Map";

export class Character {
  name: CharacterName;
  roleType: CharacterRole;
  id: number;
  description: string;
  images: {
    icon: CharacterImageType;
    full: CharacterImageType;
  };
  backgroundColor: string;
  habilities: BaseHability[];
  constructor(props: CharacterInfo) {
    this.name = props.name;
    this.roleType = props.roleType;
    this.id = props.id;
    this.description = props.description;
    this.images = {
      icon: props.images.icon,
      full: props.images.full,
    };
    this.backgroundColor = props.backgroundColor;

    this.habilities = [...HabilityFactory.getHabilitiesByCharacter(props.name)];
  }

  public get info(): CharacterInfo {
    return {
      name: this.name,
      roleType: this.roleType,
      id: this.id,
      habilities: HabilityFactory.getHabilitiesByCharacter(this.name),
      description: this.description,
      backgroundColor: this.backgroundColor,
      images: this.images,
    };
  }
}

export class PlayableCharacter extends Character implements GameObject {
  position: Vector2;
  type: string = "character";

  constructor(charInfo: CharacterInfo, position: Vector2) {
    super(charInfo);
    this.position = position;
  }

  move(position: Vector2, tiles: Tile[][]) {
    tiles[this.position.x][this.position.y].remove(this);
    tiles[position.x][position.y].add(this);
    this.position = position;
  }
}
