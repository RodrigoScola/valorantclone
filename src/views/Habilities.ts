import { CharacterName } from "../../types";

export type CharacterHabilityInfo = {
  name: string;
  description: string;
};
export interface CharacterAbility {
  name: string;
  description: string;
  imagePath: string;

  getImagePath(): string;
}

export class BaseHability implements CharacterAbility {
  name: string;
  description: string;
  imagePath: string;

  constructor(props: CharacterHabilityInfo) {
    this.name = props.name;
    this.description = props.description;
    this.imagePath = BaseHability.getImagePath(this.name);
  }
  getImagePath(): string {
    throw new Error("Method not implemented.");
  }
  static getImagePath(imageName: string): string {
    const imagename = imageName.toLocaleLowerCase().replace(" ", "_");
    return "/images/abilities/icons/" + imagename + "_icon.png";
  }
}

export class CharacterUltimateAbility implements CharacterAbility {
  name: string;
  description: string;

  imagePath: string;
  constructor(props: CharacterHabilityInfo) {
    this.name = props.name;
    this.description = props.description;
    this.imagePath = CharacterUltimateAbility.getImagePath(this.name);
  }
  getImagePath(): string {
    throw new Error("Method not implemented.");
  }
  static getImagePath(name: string): string {
    const imagename = name.toLocaleLowerCase().replace(" ", "_");
    return "/images/abilities/icons/" + imagename + "_icon.png";
  }
}

export class HabilityFactory {
  static getHabilitiesByCharacter(
    characterName: CharacterName
  ): CharacterAbility[] {
    switch (characterName) {
      case CharacterName.BRIMSTONE:
        return [
          HabilityFactory.getHability(AbilitiesIds.STIM_BEACON),
          HabilityFactory.getHability(AbilitiesIds.SKY_SMOKE),
          HabilityFactory.getHability(AbilitiesIds.INCENDIARY),
          HabilityFactory.getHability(AbilitiesIds.ORBITAL_STRIKE),
        ];
      case CharacterName.SAGE:
        return [
          HabilityFactory.getHability(AbilitiesIds.SLOW_ORB),
          HabilityFactory.getHability(AbilitiesIds.HEALING_ORB),
          HabilityFactory.getHability(AbilitiesIds.BARRIER_ORB),
          HabilityFactory.getHability(AbilitiesIds.RESURRECTION),
        ];
      case CharacterName.PHOENIX:
        return [
          HabilityFactory.getHability(AbilitiesIds.CURVE_BALL),
          HabilityFactory.getHability(AbilitiesIds.HOT_HANDS),
          HabilityFactory.getHability(AbilitiesIds.BLAZE),
          HabilityFactory.getHability(AbilitiesIds.RUN_IT_BACK),
        ];
      case CharacterName.SOVA:
        return [
          HabilityFactory.getHability(AbilitiesIds.SHOCK_BOLT),
          HabilityFactory.getHability(AbilitiesIds.RECON_BOLT),
          HabilityFactory.getHability(AbilitiesIds.OWL_DRONE),
          HabilityFactory.getHability(AbilitiesIds.HUNTERS_FURY),
        ];
      default:
        return [
          HabilityFactory.getHability(AbilitiesIds.SLOW_ORB),
          HabilityFactory.getHability(AbilitiesIds.HEALING_ORB),
          HabilityFactory.getHability(AbilitiesIds.BARRIER_ORB),
          HabilityFactory.getHability(AbilitiesIds.RESURRECTION),
        ];
    }
  }
  static getHability(id: AbilitiesIds): CharacterAbility {
    switch (id) {
      case AbilitiesIds.RESURRECTION:
        return new CharacterUltimateAbility({
          name: "Resurrection",
          description:
            "EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them. After a brief channel, the ally will be brought back to life with full health.",
        });
      case AbilitiesIds.BARRIER_ORB:
        return new BaseHability({
          name: "Barrier Orb",
          description:
            "EQUIP a barrier orb. FIRE places a solid wall. ALT FIRE rotates the targeter.",
        });
      case AbilitiesIds.HEALING_ORB:
        return new BaseHability({
          name: "HEALING ORB",
          description:
            "EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them. ALT FIRE while Sage is damaged to activate a self heal-over-time.",
        });
      case AbilitiesIds.SLOW_ORB:
        return new BaseHability({
          name: "Slow Orb",
          description:
            "EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, creating a lingering field that slows players caught inside of it.",
        });
      case AbilitiesIds.INCENDIARY:
        return new BaseHability({
          name: "Incendiary",
          description:
            "EQUIP an incendiary grenade launcher. FIRE to launch a grenade that detonates as it comes to a rest on the floor, creating a lingering fire zone that damages players within the zone.",
        });
      case AbilitiesIds.SKY_SMOKE:
        return new BaseHability({
          name: "Sky Smoke",
          description:
            "EQUIP a tactical map. FIRE to set locations where Brimstone's smoke clouds will land. ALT FIRE to confirm, launching long-lasting smoke clouds that block vision in the selected area.",
        });
      case AbilitiesIds.STIM_BEACON:
        return new BaseHability({
          name: "Stim Beacon",
          description:
            "EQUIP a stim beacon. FIRE to toss the stim beacon in front of Brimstone. Upon landing, the stim beacon will create a field that grants players RapidFire.",
        });
      case AbilitiesIds.ORBITAL_STRIKE:
        return new CharacterUltimateAbility({
          name: "Orbital Strike",
          description:
            "EQUIP a tactical map. FIRE to launch a lingering orbital strike laser at the selected location, dealing high damage-over-time to players caught in the selected area.",
        });
      case AbilitiesIds.CURVE_BALL:
        return new BaseHability({
          name: "Curve Ball",
          description:
            "EQUIP a flare orb that takes a curving path and detonates shortly after throwing. FIRE to curve the flare orb to the left, detonating and blinding any player who sees the orb. ALTERNATE FIRE to curve the flare orb to the right.",
        });
      case AbilitiesIds.HOT_HANDS:
        return new BaseHability({
          name: "Hot Hands",
          description:
            "EQUIP a fireball. FIRE to throw a fireball that explodes after a set amount of time or upon hitting the ground, creating a lingering fire zone that damages enemies.",
        });
      case AbilitiesIds.BLAZE:
        return new BaseHability({
          name: "Blaze",
          description:
            "EQUIP a flame wall. FIRE to create a line of flame that moves forward, creating a wall of fire that blocks vision and damages players passing through it. HOLD FIRE to bend the wall in the direction of your crosshair.",
        });
      case AbilitiesIds.RUN_IT_BACK:
        return new CharacterUltimateAbility({
          name: "Run it Back",
          description:
            "INSTANTLY place a marker at Phoenix’s location. While this ability is active, dying or allowing the timer to expire will end this ability and bring Phoenix back to this location with full health.",
        });
      case AbilitiesIds.SHOCK_BOLT:
        return new BaseHability({
          name: "Shock Bolt",
          description:
            "EQUIP a bow with a shock bolt. FIRE to send the explosive bolt forward, detonating upon collision and damaging players nearby. HOLD FIRE to extend the range of the projectile. ALT FIRE to add up to two bounces to this arrow.",
        });
      case AbilitiesIds.RECON_BOLT:
        return new BaseHability({
          name: "Recon Bolt",
          description:
            "EQUIP a bow with recon bolt. FIRE to send the recon bolt forward, activating upon collision and Revealing the location of nearby enemies caught in the line of sight of the bolt. Enemies can destroy this bolt. HOLD FIRE to extend the range of the projectile. ALT FIRE to add up to two bounces to this arrow.",
        });
      case AbilitiesIds.OWL_DRONE:
        return new BaseHability({
          name: "Owl Drone",
          description:
            "EQUIP an owl drone. FIRE to deploy and take control of movement of the drone. While in control of the drone, FIRE to shoot a marking dart. This dart will Reveal the location of any player struck by the dart. Enemies can destroy the Owl Drone.",
        });
      case AbilitiesIds.HUNTERS_FURY:
        return new CharacterUltimateAbility({
          name: "Hunters Fury",
          description:
            "EQUIP a bow with three long-range wall-piercing energy blasts. FIRE to release an energy blast in a line in front of Sova, dealing damage and revealing the location of enemies caught in the line. This ability can be RE-USED up to two more times while the ability timer is active.",
        });
      case AbilitiesIds.POISON_CLOUD:
        return new BaseHability({
          name: "Poison Cloud",
          description:
            "EQUIP a gas emitter. FIRE to throw the emitter that perpetually remains throughout the round. RE-USE the ability to create a toxic gas cloud at the cost of fuel. This ability can be RE-USED more than once and can be picked up to be REDEPLOYED.",
        });
      case AbilitiesIds.TOXIC_SCREEN:
        return new BaseHability({
          name: "Toxic Screen",
          description:
            "EQUIP a gas emitter launcher. FIRE to deploy a long line of gas emitters. RE-USE the ability to create a tall wall of toxic gas at the cost of fuel. This ability can be RE-USED more than once.",
        });
      case AbilitiesIds.SNAKE_BITE:
        return new BaseHability({
          name: "Snake bite",
          description:
            "EQUIP a chemical launcher. FIRE to launch a canister that shatters upon hitting the floor, creating a lingering chemical zone that damages and slows enemies.",
        });
    }
  }
}

export enum AbilitiesIds {
  BARRIER_ORB = 0,
  HEALING_ORB = 1,
  SLOW_ORB = 2,
  RESURRECTION = 3,
  INCENDIARY = 4,
  SKY_SMOKE = 5,
  STIM_BEACON = 6,
  ORBITAL_STRIKE = 7,
  CURVE_BALL = 8,
  HOT_HANDS = 9,
  BLAZE = 10,
  RUN_IT_BACK = 11,
  SHOCK_BOLT = 12,
  RECON_BOLT = 13,
  OWL_DRONE = 14,
  HUNTERS_FURY = 15,
  POISON_CLOUD = 16,
  TOXIC_SCREEN = 17,
  SNAKE_BITE = 18,
}
