import { Vector2 } from "../types";

export class GameObject {
  position: Vector2;
  type: string;
  constructor(position: Vector2, type: string) {
    this.position = position;
    this.type = type;
  }
}

export class Tile {
  position: Vector2;
  contents: GameObject[];
  color: string;
  constructor(position: Vector2, contents: GameObject[] = []) {
    this.position = position;
    this.color = "white";
    this.contents = contents;
  }

  remove(object: GameObject) {
    this.contents = this.contents.filter((x) => x !== object);
    this.color = this.contents.length ? this.contents[0].type : "white";
  }
  add(object: GameObject) {
    this.contents.push(object);
  }
}

export class ValorantMap {
  tiles: Tile[][];

  getTileByPosition(x: number, y: number) {
    return this.tiles[x][y];
  }
  constructor(tiles: Tile[][]) {
    this.tiles = tiles;
  }
}
