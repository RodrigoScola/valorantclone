import { Vector2 } from "../types";

export interface GameObject {
  position: Vector2;
  type: string;
}

export class Tile {
  position: Vector2;
  contents: GameObject[];
  constructor(position: Vector2, contents: GameObject[] = []) {
    this.position = position;
    this.contents = contents;
  }

  remove(object: GameObject) {
    this.contents = this.contents.filter((x) => x !== object);
  }
  add(object: GameObject) {
    this.contents.push(object);
  }
}

class ValorantMap {
  tiles: Tile[][];

  getTileById(id: number) {}
  constructor(tiles: Tile[][]) {
    this.tiles = tiles;
  }
}

const tiles = [];

for (let i = 0; i < 50; i++) {
  const column = [];
  for (let j = 0; j < 50; j++) {
    column.push(new Tile({ x: i, y: j }));
  }
  tiles.push(column);
}
export const currentMap = new ValorantMap(tiles);
