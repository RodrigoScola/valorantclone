export enum CharacterName {
  BRIMSTONE = "brimstone",
  PHOENIX = "phoenix",
  Sage = "sage",
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

class Character {
  public name: CharacterName;
  public role: CharacterRole;
  constructor(name: CharacterName, role: CharacterRole) {
    this.name = name;
    this.role = role;
  }

  public get info(): CharacterInfo {
    return {
      name: this.name,
      role: this.role,
    };
  }
}

interface CharacterInfo {
  name: CharacterName;
  role: CharacterRole;
}
