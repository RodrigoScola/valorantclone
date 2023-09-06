import {
  BaseHability,
  CharacterAbility,
  HabilityFactory,
} from "./src/views/Habilities";

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
}
export enum CharacterRole {
  CONTROLLER = "CONTROLLER",
  DUELIST = "DUELIST",
  INITIATOR = "INITIATOR",
  SENTINEL = "SENTINEL",
}

export class Character {
  habilities: BaseHability[];
  constructor(
    public name: CharacterName,
    public roleType: CharacterRole,
    public id: number,
    public description: string,
    public icon: CharacterImageType,
    public full: CharacterImageType,
    public backgroundColor: string
  ) {
    this.habilities = [];
  }

  public get info(): CharacterInfo {
    return {
      name: this.name,
      roleType: this.roleType,
      id: this.id,
      habilities: HabilityFactory.getHabilitiesByCharacter(this.name),
      description: this.description,
      backgroundColor: this.backgroundColor,
      images: {
        full: this.full,
        icon: this.icon,
      },
    };
  }
}
export class CharacterSelect extends Character {
  isValid: boolean;
  constructor(charInfo: CharacterInfo, isValid: boolean = false) {
    super(
      charInfo.name,
      charInfo.roleType,
      charInfo.id,
      charInfo.description,
      charInfo.images.icon,
      charInfo.images.full,
      charInfo.backgroundColor
    );
    this.isValid = isValid;
  }
  override get info() {
    return {
      ...super.info,
      valid: this.isValid,
    };
  }
}
export type RoleType = {
  id: number;
  name: CharacterRole;
  description: string;
};
type CharacterImageType = {
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
  habilities?: CharacterAbility[];
  description: string;
  images: {
    icon: CharacterImageType;
    full: CharacterImageType;
  };
}

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
export const currentPlayer = new Player();
