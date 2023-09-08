import { CharacterName, Vector2 } from "../types";
import { gameState } from "./GameState";
import { GameObject, Tile } from "./Map";
import { Component } from "./component";

export type CharacterHabilityInfo = {
  name: string;
  id: AbilitiesIds;
  description: string;
};
type CharacterAbilitiesTypes = {
  onExecuteComponents: Component;
  onSelectComponents: Component;
};

export type AffectedTile = {
  position: Vector2;
  previousState: Tile;
};
export class Highlighter extends Component {
  area: Vector2;
  offset: Vector2;
  hihglightColor: string;
  affectedTiles: AffectedTile[] = [];
  constructor(
    area: Vector2,
    highlightColor: string,
    offset: Vector2 = {
      x: 0,
      y: 0,
    }
  ) {
    super();
    this.offset = offset;
    this.area = area;
    this.hihglightColor = highlightColor;
  }

  override execute(GameObject: GameObject) {
    this.highlightArea(
      {
        x: GameObject.position.x - this.area.x + this.offset.x,
        y: GameObject.position.y - this.area.y - this.offset.y,
      },
      {
        x: GameObject.position.x + this.area.x + this.offset.x,
        y: GameObject.position.y + this.area.y - this.offset.y,
      },
      this.hihglightColor
    );
  }

  private highlightArea(startPos: Vector2, endPos: Vector2, color: string) {
    for (let i = startPos.x; i <= endPos.x; i++) {
      for (let j = startPos.y; j <= endPos.y; j++) {
        const tile = gameState.map.getTileByPosition(i, j);
        if (!tile) continue;

        this.affectedTiles.push({
          position: tile.position,
          previousState: Object.assign({}, tile),
        });
        tile.color = color;
      }
    }
  }
  override cleanup(GameObject: GameObject): void {
    this.affectedTiles.forEach((tile) => {
      const currentTile = gameState.map.getTileByPosition(
        tile.position.x,
        tile.position.y
      );
      console.log(currentTile.color);
      currentTile.color = tile.previousState.color;
      console.log(currentTile.color);
    });
  }
}

export interface CharacterAbility {
  name: string;
  id: AbilitiesIds;
  description: string;
  imagePath: string;
  addToSelect(component: Component): void;
  addToExecute(component: Component): void;
  select(GameObject: GameObject): void;
  execute(GameObject: GameObject): void;
  cleanSelect(GameObject: GameObject): void;
  get isExecuting(): boolean;
}

export class BaseHability implements CharacterAbility {
  name: string;
  description: string;
  imagePath: string;

  id: AbilitiesIds;
  private selectComponent: Component;
  private useComponents: Component;
  constructor(
    props: CharacterHabilityInfo,
    components: CharacterAbilitiesTypes = {
      onExecuteComponents: new Component(),
      onSelectComponents: new Component(),
    }
  ) {
    this.name = props.name;
    this.description = props.description;
    this.imagePath = BaseHability.getImagePath(this.name);
    this.id = props.id;
    this.selectComponent = components.onSelectComponents;
    this.useComponents = components.onExecuteComponents;
  }
  execute(GameObject: GameObject): void {
    this.useComponents.execute(GameObject);
  }
  addToSelect(component: Component): void {
    this.selectComponent.addComponent(component);
  }
  get isExecuting(): boolean {
    return this.useComponents.active;
  }
  addToExecute(component: Component): void {
    this.useComponents.addComponent(component);
  }
  select(GameObject: GameObject): void {
    this.selectComponent.execute(GameObject);
  }
  cleanSelect(GameObject: GameObject) {
    console.log("a");
    this.selectComponent.cleanup(GameObject);
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
  private selectComponent: Component;
  id: AbilitiesIds;

  private useComponents: Component;
  constructor(
    props: CharacterHabilityInfo,
    components: CharacterAbilitiesTypes = {
      onExecuteComponents: new Component(),
      onSelectComponents: new Component(),
    }
  ) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imagePath = CharacterUltimateAbility.getImagePath(this.name);
    this.selectComponent = components.onSelectComponents;
    this.useComponents = components.onExecuteComponents;
  }
  execute(): void {
    throw new Error("Method not implemented.");
  }
  addToSelect(component: Component): void {
    this.selectComponent.addComponent(component);
  }
  get isExecuting(): boolean {
    return this.useComponents.active;
  }
  addToExecute(component: Component): void {
    this.useComponents.addComponent(component);
  }
  select(GameObject: GameObject): void {
    this.selectComponent.execute(GameObject);
  }
  useAbility(GameObject: GameObject): void {
    this.useComponents.execute(GameObject);
  }
  cleanSelect(GameObject: GameObject): void {
    this.selectComponent.cleanup(GameObject);
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
      case CharacterName.VIPER:
        return [
          HabilityFactory.getHability(AbilitiesIds.POISON_CLOUD),
          HabilityFactory.getHability(AbilitiesIds.TOXIC_SCREEN),
          HabilityFactory.getHability(AbilitiesIds.SNAKE_BITE),
          HabilityFactory.getHability(AbilitiesIds.VIPERS_PIT),
        ];
      case CharacterName.CYPHER:
        return [
          HabilityFactory.getHability(AbilitiesIds.CYBER_CAGE),
          HabilityFactory.getHability(AbilitiesIds.SPY_CAM),
          HabilityFactory.getHability(AbilitiesIds.TRAPWIRE),
          HabilityFactory.getHability(AbilitiesIds.NEUTRAL_THEFT),
        ];
      case CharacterName.REYNA:
        return [
          HabilityFactory.getHability(AbilitiesIds.DEVOUR),
          HabilityFactory.getHability(AbilitiesIds.DISMISS),
          HabilityFactory.getHability(AbilitiesIds.LEER),
          HabilityFactory.getHability(AbilitiesIds.EMPRESS),
        ];
      case CharacterName.KILLJOY:
        return [
          HabilityFactory.getHability(AbilitiesIds.ALARMBOT),
          HabilityFactory.getHability(AbilitiesIds.TURRET),
          HabilityFactory.getHability(AbilitiesIds.NANOSWARM),
          HabilityFactory.getHability(AbilitiesIds.LOCKDOWN),
        ];
      case CharacterName.BREACH:
        return [
          HabilityFactory.getHability(AbilitiesIds.FLASHPOINT),
          HabilityFactory.getHability(AbilitiesIds.FAULT_LINE),
          HabilityFactory.getHability(AbilitiesIds.AFTERSHOCK),
          HabilityFactory.getHability(AbilitiesIds.ROLLING_THUNDER),
        ];
      case CharacterName.OMEN:
        return [
          HabilityFactory.getHability(AbilitiesIds.PARANOIA),
          HabilityFactory.getHability(AbilitiesIds.DARK_COVER),
          HabilityFactory.getHability(AbilitiesIds.SHROUDED_STEP),
          HabilityFactory.getHability(AbilitiesIds.FROM_SHADOWS),
        ];
      case CharacterName.JETT:
        return [
          HabilityFactory.getHability(AbilitiesIds.UPDRAFT),
          HabilityFactory.getHability(AbilitiesIds.TAILWIND),
          HabilityFactory.getHability(AbilitiesIds.CLUOUDBURST),
          HabilityFactory.getHability(AbilitiesIds.BLADE_STORM),
        ];
      case CharacterName.RAZE:
        return [
          HabilityFactory.getHability(AbilitiesIds.BLAST_PACK),
          HabilityFactory.getHability(AbilitiesIds.PAINT_SHELLS),
          HabilityFactory.getHability(AbilitiesIds.BOOM_BOT),
          HabilityFactory.getHability(AbilitiesIds.SHOWSTOPPER),
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
          id: id,
          description:
            "EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them. After a brief channel, the ally will be brought back to life with full health.",
        });
      case AbilitiesIds.BARRIER_ORB:
        return new BaseHability(
          {
            name: "Barrier Orb",
            id: id,
            description:
              "EQUIP a barrier orb. FIRE places a solid wall. ALT FIRE rotates the targeter.",
          },
          {
            onSelectComponents: new Component().addComponent(
              new Highlighter({ x: 4, y: 0 }, "pink-200", { x: 0, y: 3 })
            ),
            onExecuteComponents: new Component(),
          }
        );
      case AbilitiesIds.HEALING_ORB:
        return new BaseHability({
          name: "HEALING ORB",
          id: id,
          description:
            "EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them. ALT FIRE while Sage is damaged to activate a self heal-over-time.",
        });
      case AbilitiesIds.SLOW_ORB:
        return new BaseHability({
          name: "Slow Orb",
          id: id,
          description:
            "EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, creating a lingering field that slows players caught inside of it.",
        });
      case AbilitiesIds.INCENDIARY:
        return new BaseHability({
          name: "Incendiary",
          id: id,
          description:
            "EQUIP an incendiary grenade launcher. FIRE to launch a grenade that detonates as it comes to a rest on the floor, creating a lingering fire zone that damages players within the zone.",
        });
      case AbilitiesIds.SKY_SMOKE:
        return new BaseHability({
          name: "Sky Smoke",
          id: id,
          description:
            "EQUIP a tactical map. FIRE to set locations where Brimstone's smoke clouds will land. ALT FIRE to confirm, launching long-lasting smoke clouds that block vision in the selected area.",
        });
      case AbilitiesIds.STIM_BEACON:
        return new BaseHability({
          name: "Stim Beacon",
          id: id,
          description:
            "EQUIP a stim beacon. FIRE to toss the stim beacon in front of Brimstone. Upon landing, the stim beacon will create a field that grants players RapidFire.",
        });
      case AbilitiesIds.ORBITAL_STRIKE:
        return new CharacterUltimateAbility({
          name: "Orbital Strike",
          id: id,
          description:
            "EQUIP a tactical map. FIRE to launch a lingering orbital strike laser at the selected location, dealing high damage-over-time to players caught in the selected area.",
        });
      case AbilitiesIds.CURVE_BALL:
        return new BaseHability({
          name: "Curve Ball",
          id: id,
          description:
            "EQUIP a flare orb that takes a curving path and detonates shortly after throwing. FIRE to curve the flare orb to the left, detonating and blinding any player who sees the orb. ALTERNATE FIRE to curve the flare orb to the right.",
        });
      case AbilitiesIds.HOT_HANDS:
        return new BaseHability({
          name: "Hot Hands",
          id: id,
          description:
            "EQUIP a fireball. FIRE to throw a fireball that explodes after a set amount of time or upon hitting the ground, creating a lingering fire zone that damages enemies.",
        });
      case AbilitiesIds.BLAZE:
        return new BaseHability({
          name: "Blaze",
          id: id,
          description:
            "EQUIP a flame wall. FIRE to create a line of flame that moves forward, creating a wall of fire that blocks vision and damages players passing through it. HOLD FIRE to bend the wall in the direction of your crosshair.",
        });
      case AbilitiesIds.RUN_IT_BACK:
        return new CharacterUltimateAbility({
          name: "Run it Back",
          id: id,
          description:
            "INSTANTLY place a marker at Phoenix’s location. While this ability is active, dying or allowing the timer to expire will end this ability and bring Phoenix back to this location with full health.",
        });
      case AbilitiesIds.SHOCK_BOLT:
        return new BaseHability({
          name: "Shock Bolt",
          id: id,
          description:
            "EQUIP a bow with a shock bolt. FIRE to send the explosive bolt forward, detonating upon collision and damaging players nearby. HOLD FIRE to extend the range of the projectile. ALT FIRE to add up to two bounces to this arrow.",
        });
      case AbilitiesIds.RECON_BOLT:
        return new BaseHability({
          name: "Recon Bolt",
          id: id,
          description:
            "EQUIP a bow with recon bolt. FIRE to send the recon bolt forward, activating upon collision and Revealing the location of nearby enemies caught in the line of sight of the bolt. Enemies can destroy this bolt. HOLD FIRE to extend the range of the projectile. ALT FIRE to add up to two bounces to this arrow.",
        });
      case AbilitiesIds.OWL_DRONE:
        return new BaseHability({
          name: "Owl Drone",
          id: id,
          description:
            "EQUIP an owl drone. FIRE to deploy and take control of movement of the drone. While in control of the drone, FIRE to shoot a marking dart. This dart will Reveal the location of any player struck by the dart. Enemies can destroy the Owl Drone.",
        });
      case AbilitiesIds.HUNTERS_FURY:
        return new CharacterUltimateAbility({
          name: "Hunters Fury",
          id: id,
          description:
            "EQUIP a bow with three long-range wall-piercing energy blasts. FIRE to release an energy blast in a line in front of Sova, dealing damage and revealing the location of enemies caught in the line. This ability can be RE-USED up to two more times while the ability timer is active.",
        });
      case AbilitiesIds.POISON_CLOUD:
        return new BaseHability({
          name: "Poison Cloud",
          id: id,
          description:
            "EQUIP a gas emitter. FIRE to throw the emitter that perpetually remains throughout the round. RE-USE the ability to create a toxic gas cloud at the cost of fuel. This ability can be RE-USED more than once and can be picked up to be REDEPLOYED.",
        });
      case AbilitiesIds.TOXIC_SCREEN:
        return new BaseHability({
          name: "Toxic Screen",
          id: id,
          description:
            "EQUIP a gas emitter launcher. FIRE to deploy a long line of gas emitters. RE-USE the ability to create a tall wall of toxic gas at the cost of fuel. This ability can be RE-USED more than once.",
        });
      case AbilitiesIds.SNAKE_BITE:
        return new BaseHability({
          name: "Snake bite",
          id: id,
          description:
            "EQUIP a chemical launcher. FIRE to launch a canister that shatters upon hitting the floor, creating a lingering chemical zone that damages and slows enemies.",
        });
      case AbilitiesIds.VIPERS_PIT:
        return new CharacterUltimateAbility({
          name: "Vipers Pit",
          id: id,
          description:
            "EQUIP a chemical sprayer. FIRE to spray a chemical cloud in all directions around Viper, creating a large cloud that reduces the vision range and maximum health of players inside of it.",
        });
      case AbilitiesIds.CYBER_CAGE:
        return new BaseHability({
          name: "Cyber Cage",
          id: id,
          description:
            "INSTANTLY toss the cyber cage in front of Cypher. Activate to create a zone that blocks vision and slows enemies who pass through it.",
        });
      case AbilitiesIds.SPY_CAM:
        return new BaseHability({
          name: "Spy Cam",
          id: id,
          description:
            "EQUIP a spycam. FIRE to place the spycam at the targeted location. RE-USE this ability to take control of the camera's view. While in control of the camera, FIRE to shoot a marking dart. This dart will Reveal the location of any player struck by the dart. This ability can be picked up to be REDEPLOYED.",
        });
      case AbilitiesIds.TRAPWIRE:
        return new BaseHability({
          name: "Trapwire",
          id: id,
          description:
            "EQUIP a trapwire. FIRE to place a destructible and covert tripwire at the targeted location creating a line that spans between the placed location and the wall opposite. Enemy players who cross a tripwire will be tethered, revealed, and dazed after a short period if they do not destroy the device in time. This ability can be picked up to be REDEPLOYED.",
        });
      case AbilitiesIds.NEUTRAL_THEFT:
        return new CharacterUltimateAbility({
          name: "Neural Theft",
          id: id,
          description:
            "INSTANTLY use on a dead enemy player in your crosshairs to reveal the location of all living enemy players.",
        });
      case AbilitiesIds.DEVOUR:
        return new BaseHability({
          name: "Devour",
          id: id,
          description:
            "Enemies killed by Reyna leave behind Soul Orbs that last 3 seconds. INSTANTLY consume a nearby soul orb, rapidly healing for a short duration. Health gained through this skill exceeding 100 will decay over time. If EMPRESS is active, this skill will automatically cast and not consume the orb.",
        });
      case AbilitiesIds.DISMISS:
        return new BaseHability({
          name: "Dismiss",
          id: id,
          description:
            "INSTANTLY consume a nearby soul orb, becoming intangible for a short duration. If EMPRESS is active, also become invisible",
        });
      case AbilitiesIds.LEER:
        return new BaseHability({
          name: "Leer",
          id: id,
          description:
            "EQUIP an ethereal destructible eye. ACTIVATE to cast the eye a short distance forward. The eye will Nearsight all enemies who look at it.",
        });
      case AbilitiesIds.EMPRESS:
        return new CharacterUltimateAbility({
          name: "Empress",
          id: id,
          description:
            "INSTANTLY enter a frenzy, increasing firing speed, equip and reload speed dramatically. Scoring a kill renews the duration.",
        });

      case AbilitiesIds.ALARMBOT:
        return new BaseHability({
          id: id,
          name: "Alarmbot",
          description:
            "EQUIP a covert Alarmbot. FIRE to deploy a bot that hunts down enemies that get in range. After reaching its target, the bot explodes, applying Vulernable. HOLD EQUIP to recall a deployed bot.",
        });
      case AbilitiesIds.TURRET:
        return new BaseHability({
          id: id,
          name: "Turret",
          description:
            "EQUIP a Turret. FIRE to deploy a turret that fires at enemies in a 180 degree cone. HOLD EQUIP to recall the deployed turret.",
        });
      case AbilitiesIds.NANOSWARM:
        return new BaseHability({
          id: id,
          name: "Nanoswarm",
          description:
            "EQUIP a Nanoswarm grenade. FIRE to throw the grenade. Upon landing, the Nanoswarm goes covert. ACTIVATE the Nanoswarm to deploy a damaging swarm of nanobots.",
        });
      case AbilitiesIds.LOCKDOWN:
        return new CharacterUltimateAbility({
          id: id,
          name: "Lockdown",
          description:
            "EQUIP the Lockdown device. FIRE to deploy the device. After a long windup, the device Detains all enemies caught in the radius. The device can be destroyed by enemies.",
        });
      case AbilitiesIds.FLASHPOINT:
        return new BaseHability({
          id: id,
          name: "Flashpoint",
          description:
            "EQUIP a blinding charge. FIRE the charge to set fast-acting burst through the wall. The charge detonates to blind all players looking at it.",
        });
      case AbilitiesIds.FAULT_LINE:
        return new BaseHability(
          {
            id: id,
            name: "Fault Line",
            description:
              "EQUIP a seismic blast. HOLD FIRE to increase the distance. RELEASE to set off the quake, dazing all players in its zone and in a line up to the zone.",
          },
          {
            onSelectComponents: new Component().addComponent(
              new Highlighter(
                {
                  x: 2,
                  y: 3,
                },
                "green-200",
                {
                  x: 0,
                  y: 3,
                }
              )
            ),
            onExecuteComponents: new Component(),
          }
        );
      case AbilitiesIds.AFTERSHOCK:
        return new BaseHability({
          id: id,
          name: "Aftershock",
          description:
            "EQUIP a fusion charge. FIRE the charge to set a slow-acting burst through the wall. The burst does heavy damage to anyone caught in its area.",
        });
      case AbilitiesIds.ROLLING_THUNDER:
        return new CharacterUltimateAbility(
          {
            id: id,
            name: "Rolling Thunder",
            description:
              "EQUIP a seismic charge. FIRE to send a cascading quake through all terrain in a large cone. The quake dazes and knocks up anyone caught in it.",
          },
          {
            onSelectComponents: new Component().addComponent(
              new Highlighter(
                {
                  x: 3,
                  y: 7,
                },
                "orange-200",
                {
                  x: 0,
                  y: 7,
                }
              )
            ),
            onExecuteComponents: new Component(),
          }
        );
      case AbilitiesIds.PARANOIA:
        return new BaseHability({
          id: id,
          name: "Paranoia",
          description:
            "INSTANTLY fire a shadow projectile forward, briefly reducing the vision range of all players it touches. This projectile can pass straight through walls.",
        });
      case AbilitiesIds.DARK_COVER:
        return new BaseHability({
          id: id,
          name: "Dark Cover",
          description:
            "EQUIP a shadow orb and see its range indicator. FIRE to throw the shadow orb to the marked location, creating a long-lasting shadow sphere that blocks vision. HOLD ALTERNATE FIRE while targeting to move the marker further away. HOLD the ability key with targeting to move the market closer. Use RELOAD to cancel the targeting.",
        });
      case AbilitiesIds.SHROUDED_STEP:
        return new BaseHability({
          id: id,
          name: "Shrouded Step",
          description:
            "EQUIP a shadow walk ability and see its range indicator. FIRE to begin a brief channel, then teleport to the marked location",
        });
      case AbilitiesIds.FROM_SHADOWS:
        return new CharacterUltimateAbility({
          id: id,
          name: "From Shadows",
          description:
            "EQUIP an ethereal, destructible decoy. FIRE to throw. ALT FIRE to detonate, placing all players in the nearby area into nearsight.",
        });
      case AbilitiesIds.UPDRAFT:
        return new BaseHability({
          id: id,
          name: "Updraft",
          description: "INSTANTLY propel Jett high into the air.",
        });
      case AbilitiesIds.TAILWIND:
        return new BaseHability({
          name: "Tailwind",
          id: id,
          description: "INSTANTLY propel Jett in the direction she is moving.",
        });
      case AbilitiesIds.CLUOUDBURST:
        return new BaseHability({
          name: "Cloudburst",
          id: id,
          description:
            "INSTANTLY Throw a projectile that expands into a brief vision-blocking cloud on impact with a surface. HOLD the ability key to curve the smoke in the direction of your crosshair",
        });
      case AbilitiesIds.BLADE_STORM:
        return new CharacterUltimateAbility({
          name: "Blade Storm",
          id: id,
          description:
            "EQUIP a set of highly accurate throwing knives that recharge on killing an opponent. FIRE to throw a single knife at your target. ALTERNATE FIRE to throw all remaining daggers at your target.",
        });
      case AbilitiesIds.PAINT_SHELLS:
        return new BaseHability({
          name: "Paint Shells",
          id: id,
          description:
            "EQUIP a cluster grenade. FIRE to throw the grenade, which does damage and creates sub-munitions, each doing damage to anyone in their range.",
        });
      case AbilitiesIds.BLAST_PACK:
        return new BaseHability({
          name: "Blast Pack",
          id: id,
          description:
            "INSTANTLY throw a Blast Pack that will stick to surfaces. RE-USE the ability after deployment to detonate, damaging and moving anything hit.",
        });
      case AbilitiesIds.BOOM_BOT:
        return new BaseHability({
          name: "Boom Bot",
          id: id,
          description:
            "EQUIP a Boombot. FIRE will deploy the bot, causing it to travel in a straight line on the ground, bouncing off walls. The Boombot will lock on to any enemies in its frontal cone and chase them, exploding for heavy damage if it reaches them.",
        });
      case AbilitiesIds.SHOWSTOPPER:
        return new CharacterUltimateAbility({
          name: "Showstopper",
          id: id,
          description:
            "EQUIP a rocket launcher. FIRE shoots a rocket that does massive area damage on contact with anything.",
        });
      case AbilitiesIds.TRAILBLAZER:
        return new BaseHability({
          name: "Trailblazer",
          id: id,
          description:
            "EQUIP a Tasmanian tiger trinket. FIRE to send out and take control of the predator. While in control, FIRE to leap forward, exploding in a concussive blast and damaging directly hit enemies.",
        });
      case AbilitiesIds.GUIDING_LIGHT:
        return new BaseHability({
          name: "Guiding Light",
          id: id,
          description:
            "EQUIP a hawk trinket. FIRE to send it forward. HOLD FIRE to guide the hawk in the direction of your crosshair. RE-USE while the hawk is in flight to transform it into a flash.",
        });
      case AbilitiesIds.REGROWTH:
        return new BaseHability({
          name: "Regrowth",
          id: id,
          description: "INSTANTLY heal an ally.",
        });
      case AbilitiesIds.SEEKERS:
        return new CharacterUltimateAbility({
          name: "Seekers",
          id: id,
          description:
            "EQUIP a cluster of seekers. FIRE to deploy a swarm of nano drones that seek out enemies. If an enemy is hit by the swarm, they are marked.",
        });
    }
  }
}

export enum AbilitiesIds {
  // -------- SAGE ------
  BARRIER_ORB = 0,
  HEALING_ORB = 1,
  SLOW_ORB = 2,
  RESURRECTION = 3,
  // -------- BRIMSTONE ------
  INCENDIARY = 4,
  SKY_SMOKE = 5,
  STIM_BEACON = 6,
  ORBITAL_STRIKE = 7,
  // -------- PHOENIX ------
  CURVE_BALL = 8,
  HOT_HANDS = 9,
  BLAZE = 10,
  RUN_IT_BACK = 11,
  // -------- SOVA ------
  SHOCK_BOLT = 12,
  RECON_BOLT = 13,
  OWL_DRONE = 14,
  HUNTERS_FURY = 15,
  // -------- VIPER ------
  POISON_CLOUD = 16,
  TOXIC_SCREEN = 17,
  SNAKE_BITE = 18,
  VIPERS_PIT = 19,
  // -------- CIPHER ------
  CYBER_CAGE = 20,
  SPY_CAM = 21,
  TRAPWIRE = 22,
  NEUTRAL_THEFT = 23,
  // -------- REYNA ------
  DEVOUR = 24,
  DISMISS = 25,
  LEER = 26,
  EMPRESS = 27,
  // -------- KILLJOY ------
  ALARMBOT = 28,
  TURRET = 29,
  NANOSWARM = 30,
  LOCKDOWN = 31,
  // -------- Breach ------
  FLASHPOINT = 32,
  FAULT_LINE = 33,
  AFTERSHOCK = 34,
  ROLLING_THUNDER = 35,
  // -------- Omen ------
  PARANOIA = 36,
  DARK_COVER = 37,
  SHROUDED_STEP = 38,
  FROM_SHADOWS = 39,
  // -------- Jett ------
  UPDRAFT = 40,
  TAILWIND = 41,
  CLUOUDBURST = 42,
  BLADE_STORM = 43,
  // -------- Raze ------
  PAINT_SHELLS = 44,
  BOOM_BOT = 45,
  BLAST_PACK = 46, // Not sure in this number
  SHOWSTOPPER = 47, // Not sure in this number
  // -------- Skye ------
  TRAILBLAZER = 48,
  GUIDING_LIGHT = 49,
  REGROWTH = 50,
  SEEKERS = 51,
}
