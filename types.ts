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
  constructor(
    public name: CharacterName,
    public roleType: CharacterRole,
    public id: number,
    public description: string,
    public icon: CharacterImageType,
    public full: CharacterImageType,
    public backgroundColor: string
  ) {}

  public get info(): CharacterInfo {
    return {
      name: this.name,
      roleType: this.roleType,
      id: this.id,
      description: this.description,
      backgroundColor: "#a73c01",
      images: {
        full: this.full,
        icon: this.icon,
      },
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
  backgroundColor?: string;
  id: number;
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
}
export const currentPlayer = new Player();
