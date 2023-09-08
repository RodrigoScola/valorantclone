import { Character, PlayableCharacter } from "./src/Character";
import { CharacterAbility } from "./src/Habilities";

export enum CharacterName {
  BRIMSTONE = "brimstone",
  PHOENIX = "phoenix",
  SAGE = "sage",
  SOVA = "sova",
  VIPER = "viper",
  CYPHER = "cypher",
  REYNA = "reyna",
  KILLJOY = "killjoy",
  BREACH = "breach",
  OMEN = "omen",
  JETT = "jett",
  RAZE = "raze",
  SKYE = "skye",
  YORU = "yoru",
  ASTRA = "astra",
  KAYO = "kayo",
  CHAMBER = "chamber",
  NEON = "neon",
  FADE = "fade",
  HARBOR = "harbor",
  GEKKO = "gekko",
  DEADLOCK = "deadlock",
}
export enum CharacterRole {
  CONTROLLER = "CONTROLLER",
  DUELIST = "DUELIST",
  INITIATOR = "INITIATOR",
  SENTINEL = "SENTINEL",
}

export type RoleType = {
  id: number;
  name: CharacterRole;
  description: string;
};
export type CharacterImageType = {
  url: string;
  rotation?: number;
  scale?: number;
  x?: number;
  y?: number;
};
export interface CharacterInfo {
  name: CharacterName;
  roleType: CharacterRole;
  backgroundColor: string;
  id: number;
  habilities: CharacterAbility[];
  description: string;
  images: {
    icon: CharacterImageType;
    full: CharacterImageType;
  };
}

export type Vector2 = {
  x: number;
  y: number;
};

export class Player {
  army: Character[];

  selectedCharacter: Character | null;
  constructor() {
    this.selectedCharacter = null;
    this.army = [];
  }
  hasCharacter(id: number): boolean {
    return this.army.find((x) => x.id == id) != undefined;
  }
  canSelectMore() {
    return this.army.length < 5;
  }
}

export class InGamePlayer {
  army: PlayableCharacter[];
  private selectedCharacterId: number;

  set selectedCharacter(char: Character) {
    this.selectedCharacterId = char.id;
  }

  get selectedCharacter(): PlayableCharacter {
    return this.army.find((x) => x.id == this.selectedCharacterId)!;
  }
  constructor(army: PlayableCharacter[], selectedCharacterId: number) {
    this.army = army;
    this.selectedCharacterId = selectedCharacterId;
  }
}

export const currentPlayer = new Player();
